<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\DailyLogController;
use App\Http\Controllers\Api\MealController;
use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\Api\WorkoutController;
use Illuminate\Support\Facades\Route;

/* |-------------------------------------------------------------------------- | Public API Routes |-------------------------------------------------------------------------- */

// Authentication
Route::post('/register', [AuthController::class , 'register']);
Route::post('/login', [AuthController::class , 'login']);

// Public catalog (meals & workouts)
Route::get('/meals', [MealController::class , 'index']);
Route::get('/meals/{meal}', [MealController::class , 'show']);
Route::get('/workouts', [WorkoutController::class , 'index']);
Route::get('/workouts/{workout}', [WorkoutController::class , 'show']);

// Public blog
Route::get('/blog', [BlogPostController::class , 'index']);
Route::get('/blog/{slug}', [BlogPostController::class , 'show']);

// Contact form
Route::post('/contact', [ContactMessageController::class , 'store']);

/* |-------------------------------------------------------------------------- | Protected API Routes (auth:sanctum) |-------------------------------------------------------------------------- */

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class , 'logout']);
    Route::get('/user', [AuthController::class , 'user']);

    // User Profile
    Route::get('/profile', [UserProfileController::class , 'show']);
    Route::put('/profile', [UserProfileController::class , 'update']);

    // Daily Logs
    Route::get('/daily-logs', [DailyLogController::class , 'index']);
    Route::delete('/daily-logs', [DailyLogController::class , 'clearHistory']);
    Route::get('/daily-logs/active', [DailyLogController::class , 'getActive']);
    Route::post('/daily-logs', [DailyLogController::class , 'store']);
    Route::get('/daily-logs/{dailyLog}', [DailyLogController::class , 'show']);
    Route::post('/daily-logs/{dailyLog}/complete', [DailyLogController::class , 'complete']);

    // Daily Log → Meals pivot
    Route::post('/daily-logs/{dailyLog}/meals', [DailyLogController::class , 'attachMeal']);
    Route::delete('/daily-logs/{dailyLog}/meals/{meal}', [DailyLogController::class , 'detachMeal']);

    // Daily Log → Workouts pivot
    Route::post('/daily-logs/{dailyLog}/workouts', [DailyLogController::class , 'attachWorkout']);
    Route::delete('/daily-logs/{dailyLog}/workouts/{workout}', [DailyLogController::class , 'detachWorkout']);
});

/* |-------------------------------------------------------------------------- | Admin API Routes (auth:sanctum, admin) |-------------------------------------------------------------------------- */

Route::middleware(['auth:sanctum', \App\Http\Middleware\IsAdmin::class])->group(function () {
    // Admin Meal Management
    Route::post('/meals', [MealController::class , 'store']);
    Route::put('/meals/{meal}', [MealController::class , 'update']);
    Route::delete('/meals/{meal}', [MealController::class , 'destroy']);

    // Admin Workout Management
    Route::post('/workouts', [WorkoutController::class , 'store']);
    Route::put('/workouts/{workout}', [WorkoutController::class , 'update']);
    Route::delete('/workouts/{workout}', [WorkoutController::class , 'destroy']);
});
