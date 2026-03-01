<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('age')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->decimal('height_cm', 5, 2)->nullable();
            $table->decimal('weight_kg', 5, 2)->nullable();
            $table->enum('activity_level', [
                'sedentary',
                'lightly_active',
                'moderately_active',
                'very_active',
                'extra_active',
            ])->nullable();
            $table->decimal('goal_weight_kg', 5, 2)->nullable();
            $table->decimal('bmr', 7, 2)->nullable();
            $table->decimal('tdee', 7, 2)->nullable();
            $table->unsignedSmallInteger('daily_calorie_target')->nullable();
            $table->boolean('onboarding_completed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
