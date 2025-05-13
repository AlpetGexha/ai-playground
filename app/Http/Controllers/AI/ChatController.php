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
                ])->post('http://laravel-prismphp-tools-example.test/api/todos', [
                    'title' => $todo,
                ]);

                return "The new todo '{$todo}' was created!";
            });

        // Use Prism to generate a response
        $response = Prism::text()
            ->using(Provider::OpenAI, 'gpt-4')
            ->withMaxSteps(2)
            ->withPrompt($prompt)
            ->withTools([$todoTool])
            ->get();

        // Return the response as JSON
        return response()->json([
            'message' => $response->text,
        ]);
    }

    /**
     * Get all todos
     */
    public function todos()
    {
        $todos = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.user.token'),
            'Accept' => 'application/json'
        ])->get('http://laravel-prismphp-tools-example.test/api/todos')->json();

        return response()->json([
            'todos' => $todos,
        ]);
    }

    /**
     * Toggle todo completion status
     */
    public function toggleTodo($id)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.user.token'),
            'Accept' => 'application/json'
        ])->post("http://laravel-prismphp-tools-example.test/api/todos/{$id}/toggle");

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
                ])->post('http://laravel-prismphp-tools-example.test/api/todos', [
                    'title' => $todo,
                ]);

                return "The new todo '{$todo}' was created!";
            });

        // Stream the response
        return response()->stream(function () use ($prompt, $todoTool) {
            $stream = Prism::text()
                ->using(Provider::OpenAI, 'gpt-4')
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
        ])->get('http://laravel-prismphp-tools-example.test/api/todos');

        return response()->json([
            'todos' => $response->json('todos') ?? [],
        ]);
    }

    /**
     * Toggle todo completion status
     */
    // public function toggleTodo($id)
    // {
    //     // First get the current todo to know its completion status
    //     $todos = Http::withHeaders([
    //         'Accept' => 'application/json',
    //         'Authorization' => 'Bearer ' . config('services.user.token'),
    //     ])->get('http://laravel-prismphp-tools-example.test/api/todos')->json('todos') ?? [];

    //     // Find the todo with the given ID
    //     $todo = collect($todos)->firstWhere('id', (int) $id);

    //     if (!$todo) {
    //         return response()->json(['error' => 'Todo not found'], 404);
    //     }

    //     // Toggle the completed status
    //     $completed = !$todo['completed'];

    //     // Update the todo
    //     $response = Http::withHeaders([
    //         'Accept' => 'application/json',
    //         'Authorization' => 'Bearer ' . config('services.user.token'),
    //     ])->put('http://laravel-prismphp-tools-example.test/api/todos/' . $id, [
    //         'completed' => $completed,
    //     ]);

    //     // Return the updated todo
    //     return response()->json([
    //         'todo' => $response->json('todo'),
    //     ]);
    // }
}
