<?php

use App\Http\Controllers\AI\ImageController;
use App\Http\Controllers\AI\PoemController;
use App\Http\Controllers\AI\RoastController;
use App\Services\ChatAI;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;


Route::get('/poem', PoemController::class)->name('poem');

// Roast routes
Route::get('/roast', [RoastController::class, 'index'])->name('roast.index');
Route::post('/roast', [RoastController::class, 'store'])->name('roast.store');
Route::get('/roast/{filename}', [RoastController::class, 'show'])->name('roast.show');

Route::get('/image', [ImageController::class, 'index'])->name('image.index');
Route::post('/image', [ImageController::class, 'store'])->name('image.store');
Route::get('/image/gallery', [ImageController::class, 'gallery'])->name('image.gallery');


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
