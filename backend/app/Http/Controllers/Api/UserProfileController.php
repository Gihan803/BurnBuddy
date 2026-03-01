<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserProfileRequest;
use App\Services\HealthCalculatorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function __construct(
        private readonly HealthCalculatorService $healthCalculator,
    ) {}

    public function show(Request $request): JsonResponse
    {
        $profile = $request->user()->profile;

        if (! $profile) {
            return response()->json([
                'message' => 'Profile not found. Please complete onboarding.',
                'profile' => null,
            ], 404);
        }

        return response()->json([
            'profile' => $profile,
        ]);
    }

    public function update(UserProfileRequest $request): JsonResponse
    {
        $user    = $request->user();
        $profile = $user->profile()->firstOrCreate(['user_id' => $user->id]);
        $profile->update($request->validated());

        $metrics = $this->healthCalculator->calculateAndSave($profile->fresh());

        return response()->json([
            'message' => 'Profile updated successfully.',
            'profile' => $profile->fresh(),
            'metrics' => $metrics,
        ]);
    }
}
