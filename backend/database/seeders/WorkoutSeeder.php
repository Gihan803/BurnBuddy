<?php

namespace Database\Seeders;

use App\Models\Workout;
use Illuminate\Database\Seeder;

class WorkoutSeeder extends Seeder
{
    public function run(): void
    {
        $workouts = [
            // ─── Cardio ──────────────────────────────────────
            [
                'name' => 'Brisk Walking',
                'description' => 'A steady-paced walk at 4 mph to build endurance and burn fat.',
                'category' => 'cardio',
                'duration_minutes' => 30,
                'calories_burned' => 150,
                'difficulty' => 'beginner',
            ],
            [
                'name' => 'Running (Moderate Pace)',
                'description' => 'Moderate pace running at 6 mph on flat terrain.',
                'category' => 'cardio',
                'duration_minutes' => 30,
                'calories_burned' => 300,
                'difficulty' => 'intermediate',
            ],
            [
                'name' => 'Cycling',
                'description' => 'Moderate-intensity stationary or outdoor cycling.',
                'category' => 'cardio',
                'duration_minutes' => 45,
                'calories_burned' => 350,
                'difficulty' => 'intermediate',
            ],

            // ─── Strength ────────────────────────────────────
            [
                'name' => 'Bodyweight Squats & Lunges',
                'description' => 'Lower body circuit: 3 sets of 15 squats and 12 lunges per leg.',
                'category' => 'strength',
                'duration_minutes' => 20,
                'calories_burned' => 120,
                'difficulty' => 'beginner',
            ],
            [
                'name' => 'Push-Ups & Pull-Ups',
                'description' => 'Upper body combo: 4 sets of push-ups to failure and assisted pull-ups.',
                'category' => 'strength',
                'duration_minutes' => 25,
                'calories_burned' => 150,
                'difficulty' => 'intermediate',
            ],
            [
                'name' => 'Full Body Dumbbell Workout',
                'description' => 'Compound movements: deadlifts, rows, chest press, and shoulder press with dumbbells.',
                'category' => 'strength',
                'duration_minutes' => 45,
                'calories_burned' => 280,
                'difficulty' => 'advanced',
            ],

            // ─── Flexibility ─────────────────────────────────
            [
                'name' => 'Morning Yoga Flow',
                'description' => 'A gentle sun salutation sequence to improve flexibility and start the day.',
                'category' => 'flexibility',
                'duration_minutes' => 20,
                'calories_burned' => 80,
                'difficulty' => 'beginner',
            ],
            [
                'name' => 'Full Body Stretching',
                'description' => 'Comprehensive stretching routine targeting all major muscle groups.',
                'category' => 'flexibility',
                'duration_minutes' => 15,
                'calories_burned' => 60,
                'difficulty' => 'beginner',
            ],
            [
                'name' => 'Power Yoga',
                'description' => 'Intense yoga flow combining strength poses with deep stretches.',
                'category' => 'flexibility',
                'duration_minutes' => 45,
                'calories_burned' => 250,
                'difficulty' => 'advanced',
            ],

            // ─── HIIT ────────────────────────────────────────
            [
                'name' => 'HIIT Sprint Intervals',
                'description' => '30-second all-out sprints followed by 60-second recovery walks, repeated 8 times.',
                'category' => 'hiit',
                'duration_minutes' => 20,
                'calories_burned' => 280,
                'difficulty' => 'advanced',
            ],
            [
                'name' => 'Beginner HIIT Circuit',
                'description' => 'Jumping jacks, mountain climbers, and high knees — 20 seconds on, 40 seconds off.',
                'category' => 'hiit',
                'duration_minutes' => 15,
                'calories_burned' => 180,
                'difficulty' => 'beginner',
            ],
            [
                'name' => 'Tabata Workout',
                'description' => '8 rounds of 20-second burpees and squat jumps with 10-second rest intervals.',
                'category' => 'hiit',
                'duration_minutes' => 20,
                'calories_burned' => 320,
                'difficulty' => 'advanced',
            ],
        ];

        foreach ($workouts as $workout) {
            Workout::create($workout);
        }
    }
}
