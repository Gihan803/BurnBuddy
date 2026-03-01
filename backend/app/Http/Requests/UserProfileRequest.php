<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'age' => ['required', 'integer', 'min:13', 'max:120'],
            'gender' => ['required', Rule::in(['male', 'female'])],
            'height_cm' => ['required', 'numeric', 'min:50', 'max:300'],
            'weight_kg' => ['required', 'numeric', 'min:20', 'max:500'],
            'activity_level' => [
                'required',
                Rule::in([
                    'sedentary',
                    'lightly_active',
                    'moderately_active',
                    'very_active',
                    'extra_active',
                ]),
            ],
            'goal_weight_kg' => ['nullable', 'numeric', 'min:20', 'max:500'],
        ];
    }
}
