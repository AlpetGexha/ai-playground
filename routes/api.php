<?php

use App\Http\Controllers\Api\TodosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('todos', [TodosController::class, 'index'])->name('todos.index');
Route::post('todos', [TodosController::class, 'store'])->name('todos.store');
Route::put('todos/{todo}', [TodosController::class, 'update'])->name('todos.update');
