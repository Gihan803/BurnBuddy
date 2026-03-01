<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactMessageRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class ContactMessageController extends Controller
{
    /**
     * Store a new contact message.
     */
    public function store(ContactMessageRequest $request): JsonResponse
    {
        $message = ContactMessage::create($request->validated());

        return response()->json([
            'message' => 'Thank you for contacting us! We will get back to you soon.',
            'contact' => $message,
        ], 201);
    }
}
