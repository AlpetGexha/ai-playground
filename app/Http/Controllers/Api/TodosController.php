<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    public function index()
    {
        $todos = Todo::get();

        return response()->json([
            'todos' => $todos,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = Todo::create([
            'title' => $request->input('title'),
        ]);

        return response()->json([
            'todo' => $todo,
        ]);
    }

    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'completed' => 'required|boolean',
        ]);

        $todo->update([
            'completed' => $request->input('completed'),
        ]);

        return response()->json([
            'todo' => $todo,
        ]);
    }
}
