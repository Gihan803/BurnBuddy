<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DailyLog;
use App\Models\Workout;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DailyLogController extends Controller
{
    /**
     * List paginated daily logs for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $logs = $request->user()
            ->dailyLogs()
            ->with(['meals', 'workouts'])
            ->orderBy('log_date', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($logs);
    }

    /**
     * Create or update a daily log.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'log_date' => ['required', 'date'],
            'calories_consumed' => ['nullable', 'integer', 'min:0', 'max:15000'],
            'calories_burned' => ['nullable', 'integer', 'min:0', 'max:10000'],
            'water_ml' => ['nullable', 'integer', 'min:0', 'max:20000'],
            'weight_kg' => ['nullable', 'numeric', 'min:20', 'max:500'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $log = $request->user()->dailyLogs()->updateOrCreate(
        ['log_date' => $request->log_date],
            collect($validated)->except('log_date')->toArray(),
        );

        $log->refresh();

        return response()->json([
            'message' => 'Daily log saved successfully.',
            'daily_log' => $log->load(['meals', 'workouts']),
        ], 201);
    }

    /**
     * Show a single daily log with meals and workouts.
     */
    public function show(Request $request, DailyLog $dailyLog): JsonResponse
    {
        if ($error = $this->checkAccessOrFail($request, $dailyLog, false))
            return $error;

        return response()->json([
            'daily_log' => $dailyLog->load(['meals', 'workouts']),
        ]);
    }

    /**
     * Get the active daily log (auto-advancing to tomorrow if today is completed).
     */
    public function getActive(Request $request): JsonResponse
    {
        $user = $request->user();
        $today = now()->format('Y-m-d');

        $latestLog = $user->dailyLogs()->orderBy('log_date', 'desc')->first();
        $activeDate = $today;

        if ($latestLog) {
            if ($latestLog->is_completed) {
                $nextDate = Carbon::parse($latestLog->log_date)->addDay()->format('Y-m-d');
                if ($nextDate > $today) {
                    $activeDate = $nextDate;
                }
            }
            else {
                if ($latestLog->log_date >= $today) {
                    $activeDate = $latestLog->log_date;
                }
            }
        }

        $log = $user->dailyLogs()->updateOrCreate(
        ['log_date' => $activeDate],
        []
        );

        $isFuture = $log->log_date > $today;

        return response()->json([
            'message' => 'Active daily log fetched.',
            'daily_log' => $log->load(['meals', 'workouts']),
            'is_future' => $isFuture,
        ]);
    }

    /**
     * Attach a meal to a daily log.
     */
    public function attachMeal(Request $request, DailyLog $dailyLog): JsonResponse
    {
        $request->validate([
            'meal_id' => ['required', 'exists:meals,id'],
            'servings' => ['nullable', 'numeric', 'min:0.1', 'max:10'],
        ]);

        if ($error = $this->checkAccessOrFail($request, $dailyLog))
            return $error;

        $dailyLog->meals()->attach($request->meal_id, ['servings' => $request->get('servings', 1)]);

        $this->recalculateMealCalories($dailyLog);

        return response()->json([
            'message' => 'Meal added to daily log.',
            'daily_log' => $dailyLog->fresh()->load(['meals', 'workouts']),
        ]);
    }

    /**
     * Detach a meal from a daily log.
     */
    public function detachMeal(Request $request, DailyLog $dailyLog, int $meal): JsonResponse
    {
        if ($error = $this->checkAccessOrFail($request, $dailyLog))
            return $error;

        $dailyLog->meals()->detach($meal);

        $this->recalculateMealCalories($dailyLog);

        return response()->json([
            'message' => 'Meal removed from daily log.',
            'daily_log' => $dailyLog->fresh()->load(['meals', 'workouts']),
        ]);
    }

    /**
     * Attach a workout to a daily log.
     */
    public function attachWorkout(Request $request, DailyLog $dailyLog): JsonResponse
    {
        $request->validate([
            'workout_id' => ['required', 'exists:workouts,id'],
            'duration_minutes' => ['nullable', 'integer', 'min:1', 'max:600'],
        ]);

        if ($error = $this->checkAccessOrFail($request, $dailyLog))
            return $error;

        $workout = Workout::findOrFail($request->workout_id);
        $duration = $request->duration_minutes ?? $workout->duration_minutes;

        $dailyLog->workouts()->attach($request->workout_id, ['duration_minutes' => $duration]);

        $this->recalculateWorkoutCalories($dailyLog);

        return response()->json([
            'message' => 'Workout added to daily log.',
            'daily_log' => $dailyLog->fresh()->load(['meals', 'workouts']),
        ]);
    }

    /**
     * Detach a workout from a daily log.
     */
    public function detachWorkout(Request $request, DailyLog $dailyLog, int $workout): JsonResponse
    {
        if ($error = $this->checkAccessOrFail($request, $dailyLog))
            return $error;

        $dailyLog->workouts()->detach($workout);

        $this->recalculateWorkoutCalories($dailyLog);

        return response()->json([
            'message' => 'Workout removed from daily log.',
            'daily_log' => $dailyLog->fresh()->load(['meals', 'workouts']),
        ]);
    }

    /**
     * Recalculate total calories consumed from attached meals.
     */
    private function recalculateMealCalories(DailyLog $log): void
    {
        $totalCalories = $log->fresh()->meals->sum(function ($meal) {
            return $meal->calories * $meal->pivot->servings;
        });

        $log->update(['calories_consumed' => (int)$totalCalories]);
    }

    /**
     * Recalculate total calories burned from attached workouts.
     */
    private function recalculateWorkoutCalories(DailyLog $log): void
    {
        $totalBurned = $log->fresh()->workouts->sum(function ($wk) {
            return ($wk->estimated_calories_per_hour / 60) * $wk->pivot->duration_minutes;
        });

        $log->update(['calories_burned' => (int)$totalBurned]);
    }

    /**
     * Mark the daily log as complete.
     */
    public function complete(Request $request, DailyLog $dailyLog): JsonResponse
    {
        if ($error = $this->checkAccessOrFail($request, $dailyLog, false))
            return $error;

        $dailyLog->update(['is_completed' => true]);

        return response()->json([
            'message' => 'Day completed successfully.',
            'daily_log' => $dailyLog->fresh()->load(['meals', 'workouts']),
        ]);
    }

    /**
     * Clear all daily log history for the authenticated user.
     */
    public function clearHistory(Request $request): JsonResponse
    {
        $request->user()->dailyLogs()->delete();

        return response()->json([
            'message' => 'History cleared successfully.',
        ]);
    }

    /**
     * Extract authorization and status checks.
     */
    private function checkAccessOrFail(Request $request, DailyLog $dailyLog, bool $checkCompleted = true): ?JsonResponse
    {
        if ($dailyLog->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($checkCompleted && $dailyLog->is_completed) {
            return response()->json(['message' => 'Cannot modify a completed day.'], 400);
        }

        return null;
    }
}
