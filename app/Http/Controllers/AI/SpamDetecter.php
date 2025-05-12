<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use App\Rules\SpamFree;
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
            'comment' => ['required', 'string', 'min:3', 'max:500', new SpamFree],
        ]);


        // Return a structured JSON response with appropriate message
        return response()->json([
            'success' => true,
            'comment' => $request->comment
        ]);
    }
}
