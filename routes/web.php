<?php

use App\Http\Controllers\AI\ImageController;
use App\Http\Controllers\AI\PoemController;
use App\Http\Controllers\AI\RoastController;
use App\Http\Controllers\AI\LoveLetterController;
use App\Services\ChatAI;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AI\SpamDetecter;
use OpenAI\Laravel\Facades\OpenAI;


// Poem generation routes
Route::get('/poem', [PoemController::class, 'index'])->name('poem.index');
Route::post('/poem/generate', [PoemController::class, 'generate'])->name('poem.generate');
Route::post('/poem/modify', [PoemController::class, 'modify'])->name('poem.modify');

// Roast routes
Route::get('/roast', [RoastController::class, 'index'])->name('roast.index');
Route::post('/roast', [RoastController::class, 'store'])->name('roast.store');
Route::get('/roast/{filename}', [RoastController::class, 'show'])->name('roast.show');

// Image generation routes
Route::get('/image', [ImageController::class, 'index'])->name('image.index');
Route::post('/image', [ImageController::class, 'store'])->name('image.store');
Route::get('/image/gallery', [ImageController::class, 'gallery'])->name('image.gallery');

// Spam Detecter Comments routes
Route::get('/comment', [SpamDetecter::class, 'index'])->name('comments.index');
Route::post('/comment', [SpamDetecter::class, 'store'])->name('comment.store');

// Love letter routes
Route::get('/loveletter', [LoveLetterController::class, 'index'])->name('loveletter.index');
Route::post('/loveletter', [LoveLetterController::class, 'generate'])->name('loveletter.generate');


Route::get('/', function () {
    return Inertia::render('AILanding');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


// AI Chat routes

Route::get('/chat', [App\Http\Controllers\AI\ChatController::class, 'index'])->name('chat');
Route::post('/chat', [App\Http\Controllers\AI\ChatController::class, 'processChat'])->name('chat.process');
Route::get('/chat/stream', [App\Http\Controllers\AI\ChatController::class, 'streamChat'])->name('chat.stream');
Route::get('/todos', [App\Http\Controllers\AI\ChatController::class, 'getTodos'])->name('todos');
Route::post('/todos/{id}/toggle', [App\Http\Controllers\AI\ChatController::class, 'toggleTodo'])->name('todos.toggle');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
