<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;


Route::get('/ai', function () {

    $result = OpenAI::chat()->create([
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            ['role' => 'user', 'content' => 'Hello!'],
        ],
    ]);

    dd($result);
});

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
