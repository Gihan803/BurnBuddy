<?php

namespace Database\Seeders;

use App\Models\Meal;
use Illuminate\Database\Seeder;

class MealSeeder extends Seeder
{
    public function run(): void
    {
        $meals = [
            // ─── Breakfast ───────────────────────────────────
            [
                'name' => 'Greek Yogurt Parfait',
                'description' => 'Creamy Greek yogurt layered with fresh berries, granola, and a drizzle of honey.',
                'category' => 'breakfast',
                'calories' => 320,
                'protein_g' => 18.00,
                'carbs_g' => 42.00,
                'fat_g' => 8.50,
            ],
            [
                'name' => 'Veggie Omelette',
                'description' => 'Three-egg omelette with spinach, bell peppers, mushrooms, and feta cheese.',
                'category' => 'breakfast',
                'calories' => 350,
                'protein_g' => 24.00,
                'carbs_g' => 8.00,
                'fat_g' => 25.00,
            ],
            [
                'name' => 'Overnight Oats',
                'description' => 'Rolled oats soaked in almond milk with chia seeds, banana, and cinnamon.',
                'category' => 'breakfast',
                'calories' => 290,
                'protein_g' => 10.00,
                'carbs_g' => 48.00,
                'fat_g' => 7.00,
            ],

            // ─── Lunch ───────────────────────────────────────
            [
                'name' => 'Grilled Chicken Salad',
                'description' => 'Mixed greens with grilled chicken breast, cherry tomatoes, avocado, and balsamic vinaigrette.',
                'category' => 'lunch',
                'calories' => 420,
                'protein_g' => 38.00,
                'carbs_g' => 15.00,
                'fat_g' => 22.00,
            ],
            [
                'name' => 'Quinoa Bowl',
                'description' => 'Quinoa with roasted sweet potato, black beans, corn, avocado, and lime dressing.',
                'category' => 'lunch',
                'calories' => 480,
                'protein_g' => 16.00,
                'carbs_g' => 68.00,
                'fat_g' => 14.00,
            ],
            [
                'name' => 'Turkey Wrap',
                'description' => 'Whole wheat wrap with lean turkey, hummus, spinach, and roasted red peppers.',
                'category' => 'lunch',
                'calories' => 380,
                'protein_g' => 28.00,
                'carbs_g' => 35.00,
                'fat_g' => 12.00,
            ],

            // ─── Dinner ──────────────────────────────────────
            [
                'name' => 'Baked Salmon with Asparagus',
                'description' => 'Herb-crusted salmon fillet with roasted asparagus and lemon butter sauce.',
                'category' => 'dinner',
                'calories' => 450,
                'protein_g' => 42.00,
                'carbs_g' => 8.00,
                'fat_g' => 28.00,
            ],
            [
                'name' => 'Lean Beef Stir-Fry',
                'description' => 'Lean beef strips with broccoli, snap peas, and bell peppers in ginger-soy sauce over brown rice.',
                'category' => 'dinner',
                'calories' => 520,
                'protein_g' => 36.00,
                'carbs_g' => 52.00,
                'fat_g' => 16.00,
            ],
            [
                'name' => 'Grilled Chicken Breast with Sweet Potato',
                'description' => 'Seasoned chicken breast with baked sweet potato and steamed green beans.',
                'category' => 'dinner',
                'calories' => 440,
                'protein_g' => 40.00,
                'carbs_g' => 38.00,
                'fat_g' => 10.00,
            ],

            // ─── Snack ───────────────────────────────────────
            [
                'name' => 'Protein Smoothie',
                'description' => 'Whey protein, banana, peanut butter, and almond milk blended smooth.',
                'category' => 'snack',
                'calories' => 280,
                'protein_g' => 25.00,
                'carbs_g' => 30.00,
                'fat_g' => 8.00,
            ],
            [
                'name' => 'Apple Slices with Almond Butter',
                'description' => 'Crisp apple slices served with two tablespoons of natural almond butter.',
                'category' => 'snack',
                'calories' => 220,
                'protein_g' => 6.00,
                'carbs_g' => 26.00,
                'fat_g' => 12.00,
            ],
            [
                'name' => 'Mixed Nuts & Dried Fruit',
                'description' => 'A balanced mix of almonds, walnuts, cashews, and dried cranberries.',
                'category' => 'snack',
                'calories' => 200,
                'protein_g' => 5.00,
                'carbs_g' => 20.00,
                'fat_g' => 12.00,
            ],
        ];

        foreach ($meals as $meal) {
            Meal::create($meal);
        }
    }
}
