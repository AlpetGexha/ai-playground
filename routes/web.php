<?php

use App\Http\Controllers\AI\ImageController;
use App\Http\Controllers\AI\PoemController;
use App\Http\Controllers\AI\RoastController;
use App\Services\ChatAI;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
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
use App\Http\Controllers\AI\SpamDetecter;

Route::get('/comment', [SpamDetecter::class, 'index'])->name('comments.index');
Route::post('/comment', [SpamDetecter::class, 'store'])->name('comment.store');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
