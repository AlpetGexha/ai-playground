<?php

namespace App\Http\Controllers\AI;

use Prism\Prism\Prism;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Prism\Prism\Facades\Tool;
use Prism\Prism\Enums\Provider;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ChatController extends Controller
{
    /**
     * Show the chat interface
     */
    public function index()
    {
        return Inertia::render('AIChatPage');
    }

    /**
     * Process AI chat request
     */
    public function processChat(Request $request)
    {
        $prompt = $request->input('message');

        // Create a todo tool similar to the Livewire component
        $todoTool = Tool::as('todos')
            ->for('Create new todos')
            ->withStringParameter('todo', 'The title for the todo')
            ->using(function (string $todo) {
                Http::withHeaders([
                    'Authorization' => 'Bearer ' . config('services.user.token'),
                    'Accept' => 'application/json'
                ])->post(route('todos.store'), [
                    'title' => $todo,
                ]);

                return "The new todo '{$todo}' was created!";
            });

        // Use Prism to generate a response
        $response = Prism::text()
            ->using(Provider::OpenAI, 'gpt-3.5-turbo')
            ->withMaxSteps(2)
            ->withPrompt($prompt)
            ->withTools([$todoTool])
            ->get();

        // Return the response as JSON
        return response()->json([
            'message' => $response->text,
        ]);
    }

    // This method is replaced by getTodos()

    /**
     * Toggle todo completion status
     */
    public function toggleTodo($id)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.user.token'),
            'Accept' => 'application/json'
        ])->post(route('todos.toggle', ['id' => $id]));

        return response()->json([
            'success' => $response->successful(),
        ]);
    }

    /**
     * Stream AI chat response
     */
    public function streamChat(Request $request)
    {
        $prompt = $request->input('message');

        // Create a todo tool similar to the Livewire component
        $todoTool = Tool::as('todos')
            ->for('Create new todos')
            ->withStringParameter('todo', 'The title for the todo')
            ->using(function (string $todo) {
                Http::withHeaders([
                    'Authorization' => 'Bearer ' . config('services.user.token'),
                    'Accept' => 'application/json'
                ])->post(route('todos.store'), [
                    'title' => $todo,
                ]);

                return "The new todo '{$todo}' was created!";
            });

        // Stream the response
        return response()->stream(function () use ($prompt, $todoTool) {
            $stream = Prism::text()
                ->using(Provider::OpenAI, 'gpt-3.5-turbo')
                ->withMaxSteps(2)
                ->withPrompt($prompt)
                ->withTools([$todoTool])
                ->asStream();

            foreach ($stream as $chunk) {
                echo "data: " . json_encode(['chunk' => $chunk->text]) . "\n\n";
                ob_flush();
                flush();
            }

            echo "data: [DONE]\n\n";
            ob_flush();
            flush();
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'X-Accel-Buffering' => 'no',
        ]);
    }

    /**
     * Fetch todos for the current user
     */
    public function getTodos()
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . config('services.user.token'),
        ])->get(route('todos.index'));

        return response()->json([
            'todos' => $response->json('todos') ?? [],
        ]);
    }
}
