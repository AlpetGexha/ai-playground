<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use App\Services\ChatAI;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PoemController extends Controller
{
    /**
     * Display the poem generator page.
     */
    public function index(Request $request)
    {
        return Inertia::render('Poem/Index');
    }

    /**
     * Generate a new poem based on user prompt.
     */
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'prompt' => 'required|string|min:5|max:1000',
        ]);

        $chat = new ChatAI();
        $prompt = $this->createPrompt($validated['prompt']);
        $poem = $chat->send($prompt);

        return Inertia::render('Poem/Index', [
            'poem' => $poem,
            'prompt' => $validated['prompt']
        ]);
    }

    /**
     * Modify an existing poem based on user instructions.
     */
    public function modify(Request $request)
    {
        $validated = $request->validate([
            'prompt' => 'required|string|min:5|max:1000',
            'poem' => 'required|string',
            'instruction' => 'required|string|min:5|max:500',
        ]);

        $chat = new ChatAI();

        // Set the context with the original poem
        $chat->systemMessage('You are a creative poet who produces well-formatted, beautiful poems. You will be given a poem to modify according to the user\'s instructions.');
        $chat->send("Here is the original poem that was based on this prompt: \"{$validated['prompt']}\"\n\nPoem:\n{$validated['poem']}");

        // Modify the poem based on instructions
        $modifiedPoem = $chat->reply("Please modify this poem according to these instructions: {$validated['instruction']}");

        return Inertia::render('Poem/Index', [
            'poem' => $modifiedPoem,
            'prompt' => $validated['prompt']
        ]);
    }

    /**
     * Create an enhanced poetry prompt from user input.
     */
    private function createPrompt(string $userPrompt): string
    {
        return "Create a beautiful, well-formatted poem based on this request: \"{$userPrompt}\".
                Use appropriate stanzas, line breaks, and poetic devices to elevate the quality.
                The poem should have a coherent structure and flow. If appropriate for the request,
                consider using metaphors, similes, imagery, and other literary devices to make
                the poem more expressive and impactful.";
    }
}
