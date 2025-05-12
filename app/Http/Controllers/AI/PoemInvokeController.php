<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use App\Services\ChatAI;
use Illuminate\Http\Request;

class PoemInvokeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $chat = new ChatAI();

        $poem = $chat->send('Compose a poem that explains the concept of recursion in programming.');
        // Write a poem about the feeling of hope after a long night of sorrow. Make it a free-verse poem, gentle in tone, with natural imagery like the dawn, birds, and flowers.
        $sillyPoem = $chat->reply('Cool, can you make it much, much sillier.');

        return Inertia::render('AI', [
            'sillyPoem' => $sillyPoem
        ]);
    }
}
