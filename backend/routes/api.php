<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Route de récupération de toutes les tâches
Route::get('/tasks', [TaskController::class, 'list']);

// Récupération d'une tâche
Route::get('/tasks/{id}', [TaskController::class, 'read']);

// Ajout d'une tâche
Route::post('/tasks', [TaskController::class, 'create']);

// Modification
Route::put('/tasks/{id}', [TaskController::class, 'update']);

// Suppression
Route::delete('/tasks/{id}', [TaskController::class, 'delete']);
