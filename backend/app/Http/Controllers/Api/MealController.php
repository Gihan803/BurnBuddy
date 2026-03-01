<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Meal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MealController extends Controller
{
    /**
     * List active meals with optional filters.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Meal::active();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('max_calories')) {
            $query->where('calories', '<=', (int)$request->max_calories);
        }

        if ($request->has('min_calories')) {
            $query->where('calories', '>=', (int)$request->min_calories);
        }

        $meals = $query->orderBy('category')
            ->orderBy('name')
            ->paginate($request->get('per_page', 15));

        return response()->json($meals);
    }

    /**
     * Show a single meal.
     */
    public function show(Meal $meal): JsonResponse
    {
        return response()->json([
            'meal' => $meal,
            'data' => $meal,
        ]);
    }

    /**
     * Store a newly created meal.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate($this->getValidationRules());

        $meal = Meal::create($validated);

        return response()->json([
            'message' => 'Meal created successfully',
            'data' => $meal
        ], 201);
    }

    /**
     * Update an existing meal.
     */
    public function update(Request $request, Meal $meal): JsonResponse
    {
        $validated = $request->validate($this->getValidationRules(true));

        $meal->update($validated);

        return response()->json([
            'message' => 'Meal updated successfully',
            'data' => $meal
        ]);
    }

    /**
     * Delete a meal.
     */
    public function destroy(Meal $meal): JsonResponse
    {
        $meal->delete();

        return response()->json([
            'message' => 'Meal deleted successfully'
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
            'category' => [...$req, 'in:Breakfast,Lunch,Dinner,Snack,breakfast,lunch,dinner,snack'],
            'calories' => [...$req, 'integer', 'min:0'],
            'protein_g' => ['nullable', 'numeric', 'min:0'],
            'carbs_g' => ['nullable', 'numeric', 'min:0'],
            'fat_g' => ['nullable', 'numeric', 'min:0'],
            'image_url' => ['nullable', 'url'],
        ];
    }
}
