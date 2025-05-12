<?php

namespace App\Http\Controllers\AI;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LoveLetterController extends Controller
{
    /**
     * Display the love letter generator page.
     */
    public function index(Request $request)
    {
        return inertia('LoveLetter/Index');
    }

    /**
     * Generate a new love letter based on user prompt.
     */
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'recipient' => 'required|string|max:100',
            'type' => 'required|string|in:romantic,funny,apology,flirty,dramatic',
            'traits' => 'required|string|max:500',
            'tone' => 'required|string|in:poetic,casual,shakespearean,songlyrics,cheesy',
            'length' => 'required|string|in:short,medium,long',
            'prompt' => 'required|string|min:5|max:1000',
        ]);

        $chat = new \App\Services\ChatAI();
        $chat->systemMessage("You are LoveLetterAI, a poetic and expressive assistant who writes creative love letters based on user inputs. Your tone can be romantic, sweet, funny, or dramatic depending on the user’s request. Always make the letter sound heartfelt and unique, using elegant language and vivid imagery when appropriate.");


        // Write a romantic love letter to Alex. Make it poetic and sweet. Include references to how we met on a rainy day and how Alex always makes the best coffee. Keep it medium in length.
        $prompt = "Write a {$request->type} love letter to {$request->recipient}. Make it {$request->tone}. Include references to {$request->traits}. Keep it {$request->length} in length.";
        // $prompt = "Write a romantic love letter to Alex. Make it poetic and sweet. Include references to how we met on a rainy day and how Alex always makes the best coffee. Keep it medium in length.";
        $letter = $chat->completions($prompt);

        return inertia('LoveLetter/Index', [
            'letter' => $letter,
            'prompt' => $prompt
        ]);
    }
}
