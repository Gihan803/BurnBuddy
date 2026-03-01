<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ─── Admin User ──────────────────────────────────
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@burnbuddy.com',
            'password' => Hash::make('123456'),
            'subscription_tier' => 'pro',
        ]);

        $admin->profile()->create([
            'age' => 30,
            'gender' => 'male',
            'height_cm' => 178.00,
            'weight_kg' => 82.00,
            'activity_level' => 'moderately_active',
            'goal_weight_kg' => 75.00,
            'bmr' => 1795.50,
            'tdee' => 2783.03,
            'daily_calorie_target' => 2283,
            'onboarding_completed' => true,
        ]);

        // ─── Test User ───────────────────────────────────
        $testUser = User::create([
            'name' => 'Test User',
            'email' => 'test@burnbuddy.com',
            'password' => Hash::make('password'),
        ]);

        $testUser->profile()->create([
            'age' => 26,
            'gender' => 'female',
            'height_cm' => 165.00,
            'weight_kg' => 70.00,
            'activity_level' => 'lightly_active',
            'goal_weight_kg' => 60.00,
            'bmr' => 1400.50,
            'tdee' => 1925.69,
            'daily_calorie_target' => 1426,
            'onboarding_completed' => true,
        ]);

        // ─── Seed Meals & Workouts ───────────────────────
        $this->call([
            MealSeeder::class ,
            WorkoutSeeder::class ,
        ]);

        // ─── Sample Blog Posts ───────────────────────────
        BlogPost::create([
            'author_id' => $admin->id,
            'title' => '10 Simple Tips to Start Your Weight Loss Journey',
            'slug' => '10-simple-tips-weight-loss',
            'excerpt' => 'Getting started is often the hardest part. Here are 10 actionable tips to help you begin your fitness transformation today.',
            'body' => '<h2>Start Small, Win Big</h2><p>The key to sustainable weight loss is consistency, not intensity. Begin with small, manageable changes to your daily routine.</p><h3>1. Track What You Eat</h3><p>Awareness is the first step. Use BurnBuddy to log your meals and understand your current eating habits.</p><h3>2. Drink More Water</h3><p>Aim for at least 8 glasses per day. Often, thirst is confused with hunger.</p><h3>3. Move More</h3><p>You don\'t need to run a marathon — start with a 20-minute daily walk.</p>',
            'status' => 'published',
            'published_at' => now()->subDays(5),
        ]);

        BlogPost::create([
            'author_id' => $admin->id,
            'title' => 'Understanding Your BMR and TDEE',
            'slug' => 'understanding-bmr-tdee',
            'excerpt' => 'Learn how your Basal Metabolic Rate and Total Daily Energy Expenditure affect your weight loss goals.',
            'body' => '<h2>What is BMR?</h2><p>Your Basal Metabolic Rate (BMR) is the number of calories your body burns at rest. It accounts for about 60-75% of your daily calorie expenditure.</p><h2>What is TDEE?</h2><p>Total Daily Energy Expenditure (TDEE) is your BMR multiplied by an activity factor. This gives you the total number of calories you burn each day.</p><h2>The 500-Calorie Rule</h2><p>To lose approximately 1 pound per week, you need a daily deficit of 500 calories below your TDEE. BurnBuddy calculates this for you automatically!</p>',
            'status' => 'published',
            'published_at' => now()->subDays(2),
        ]);

        BlogPost::create([
            'author_id' => $admin->id,
            'title' => 'Best Pre-Workout Meals for Maximum Energy',
            'slug' => 'best-pre-workout-meals',
            'excerpt' => 'Fuel your workouts with the right nutrition. Discover the best meals to eat before exercising.',
            'body' => '<h2>Timing Matters</h2><p>Eat your pre-workout meal 1-3 hours before exercise for optimal energy.</p><h3>Quick Options (30 min before)</h3><ul><li>Banana with a tablespoon of peanut butter</li><li>A small handful of trail mix</li></ul><h3>Full Meals (2-3 hours before)</h3><ul><li>Oatmeal with berries and honey</li><li>Grilled chicken with sweet potato</li></ul>',
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}
