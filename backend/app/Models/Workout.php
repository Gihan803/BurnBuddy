<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Workout extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'category',
        'duration_minutes',
        'calories_burned',
        'difficulty',
        'image_url',
        'is_active',
    ];

    protected $appends = [
        'estimated_calories_per_hour',
        'standard_duration_minutes',
    ];

    public function getEstimatedCaloriesPerHourAttribute(): int
    {
        if ($this->duration_minutes <= 0)
            return 0;
        return (int)round(($this->calories_burned / $this->duration_minutes) * 60);
    }

    public function getStandardDurationMinutesAttribute(): int
    {
        return $this->duration_minutes;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'duration_minutes' => 'integer',
            'calories_burned' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    // ─── Scopes ──────────────────────────────────────────────

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    // ─── Relationships ───────────────────────────────────────

    public function dailyLogs(): BelongsToMany
    {
        return $this->belongsToMany(DailyLog::class , 'daily_log_workout')
            ->withPivot('duration_minutes')
            ->withTimestamps();
    }
}
