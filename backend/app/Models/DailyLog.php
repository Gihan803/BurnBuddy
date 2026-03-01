<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DailyLog extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'log_date',
        'calories_consumed',
        'calories_burned',
        'water_ml',
        'weight_kg',
        'notes',
        'is_completed',
    ];

    protected $appends = ['net_calories'];

    public function getNetCaloriesAttribute(): int
    {
        return (int)$this->calories_consumed - (int)$this->calories_burned;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'log_date' => 'date',
            'calories_consumed' => 'integer',
            'calories_burned' => 'integer',
            'water_ml' => 'integer',
            'weight_kg' => 'decimal:2',
            'is_completed' => 'boolean',
        ];
    }

    // ─── Relationships ───────────────────────────────────────

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function meals(): BelongsToMany
    {
        return $this->belongsToMany(Meal::class , 'daily_log_meal')
            ->withPivot('servings')
            ->withTimestamps();
    }

    public function workouts(): BelongsToMany
    {
        return $this->belongsToMany(Workout::class , 'daily_log_workout')
            ->withPivot('duration_minutes')
            ->withTimestamps();
    }
}
