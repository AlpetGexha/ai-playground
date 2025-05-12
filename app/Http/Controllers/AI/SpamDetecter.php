<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class SpamDetecter extends Controller
{
    public function index()
    {
        return Inertia::render('Spam/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required|string|min:3|max:500',
        ]);

        $response = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo-1106',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a forum moderator who always responds using JSON.'],
                [
                    'role' => 'user',
                    'content' => <<<EOT
                    Please inspect the following text and determine if it is spam.

                    {$request->comment}

                    Expected Response Example:

                    {"is_spam": true|false}
                    EOT
                ]
            ],
            'response_format' => ['type' => 'json_object'],
            'temperature' => 0.1,
        ])->choices[0]->message->content;

        // Parse the JSON response
        $response = json_decode($response);

        // Return a structured JSON response with appropriate message
        return response()->json([
            'success' => true,
            'is_spam' => $response->is_spam ?? false,
            'message' => $response->is_spam ? 'Your comment was flagged as spam and cannot be posted.' : 'The comment is clear, it can be posted!',
            'comment' => $request->comment
        ]);
    }
}
