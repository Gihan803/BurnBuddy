<?php

namespace App\Services;

use App\Models\UserProfile;

class HealthCalculatorService
{
    private const ACTIVITY_MULTIPLIERS = [
        'sedentary'        => 1.2,
        'lightly_active'   => 1.375,
        'moderately_active' => 1.55,
        'very_active'      => 1.725,
        'extra_active'     => 1.9,
    ];

    private const CALORIE_FLOOR = [
        'male'   => 1500,
        'female' => 1200,
    ];

    private const CALORIE_DEFICIT = 500;

    public function calculateBmr(float $weightKg, float $heightCm, int $age, string $gender): float
    {
        $base = (10 * $weightKg) + (6.25 * $heightCm) - (5 * $age);

        return $gender === 'male'
            ? round($base + 5, 2)
            : round($base - 161, 2);
    }

    public function calculateTdee(float $bmr, string $activityLevel): float
    {
        $multiplier = self::ACTIVITY_MULTIPLIERS[$activityLevel] ?? 1.2;

        return round($bmr * $multiplier, 2);
    }

    public function calculateDailyCalorieTarget(float $tdee, string $gender): int
    {
        $target = $tdee - self::CALORIE_DEFICIT;
        $floor  = self::CALORIE_FLOOR[$gender] ?? 1200;

        return (int) max($target, $floor);
    }

    public function calculateAndSave(UserProfile $profile): array
    {
        $bmr  = $this->calculateBmr(
            (float) $profile->weight_kg,
            (float) $profile->height_cm,
            (int) $profile->age,
            $profile->gender,
        );

        $tdee = $this->calculateTdee($bmr, $profile->activity_level);

        $dailyCalorieTarget = $this->calculateDailyCalorieTarget($tdee, $profile->gender);

        $profile->update([
            'bmr'                  => $bmr,
            'tdee'                 => $tdee,
            'daily_calorie_target' => $dailyCalorieTarget,
            'onboarding_completed' => true,
        ]);

        return [
            'bmr'                  => $bmr,
            'tdee'                 => $tdee,
            'daily_calorie_target' => $dailyCalorieTarget,
        ];
    }
}
