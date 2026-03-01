<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Workout;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    /**
     * List active workouts with optional filters.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Workout::active();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        $workouts = $query->orderBy('category')
            ->orderBy('name')
            ->paginate($request->get('per_page', 15));

        return response()->json($workouts);
    }

    /**
     * Show a single workout.
     */
    public function show(Workout $workout): JsonResponse
    {
        return response()->json([
            'workout' => $workout,
            'data' => $workout,
        ]);
    }

    /**
     * Store a newly created workout.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate($this->getValidationRules());

        $workout = Workout::create($validated);

        return response()->json([
            'message' => 'Workout created successfully',
            'data' => $workout
        ], 201);
    }

    /**
     * Update an existing workout.
     */
    public function update(Request $request, Workout $workout): JsonResponse
    {
        $validated = $request->validate($this->getValidationRules(true));

        $workout->update($validated);

        return response()->json([
            'message' => 'Workout updated successfully',
            'data' => $workout
        ]);
    }

    /**
     * Delete a workout.
     */
    public function destroy(Workout $workout): JsonResponse
    {
        $workout->delete();

        return response()->json([
            'message' => 'Workout deleted successfully'
        ]);
    }

    /**
     * Get validation rules.
     */
    private function getValidationRules(bool $isUpdate = false): array
    {
        $req = $isUpdate ? ['sometimes', 'required'] : ['required'];
        return [
            'name' => [...$req, 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => [...$req, 'in:Cardio,Strength,Flexibility,HIIT,cardio,strength,flexibility,hiit'],
            'duration_minutes' => [...$req, 'integer', 'min:1'],
            'calories_burned' => [...$req, 'integer', 'min:0'],
            'difficulty' => [...$req, 'in:Beginner,Intermediate,Advanced,beginner,intermediate,advanced'],
            'image_url' => ['nullable', 'url'],
        ];
    }
}
