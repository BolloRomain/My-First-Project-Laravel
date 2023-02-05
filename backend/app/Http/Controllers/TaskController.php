<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function list()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function read ($id) {
        $task = Task::find($id);

        if ($task === null) {
            return response("la tache n'existe pas", 404);
        }

        return response()->json($task);
    }

    public function create (Request $request) {
        $title = $request->input('title');
        if ( empty($title) ) {
            return response("Le titre n'est pas renseigné", 400);
        }

        $task = new Task();
        $task->title = $title;
        $success = $task->save();

        if ( $success ) {
            return response()->json($task, 201);
        }
        else {
            return response("erreur lors de la création de la tâche", 500);
        }
    }

    public function update ($id, Request $request) {
        $title = $request->input('title');
        if(empty($title)){
            return response("Le titre n'est pas renseigné", 400);
        }
        $task = Task::find($id);
        if ($task === null) {
            return response("La tâche demandée n'éxiste pas", 404);
        }

        $task->title = $title;
        $success = $task->save();

        if($success){
            return response()->json($task, 201);
        }
        else {
            return response("Erreur de modification", 500);
        }
    }

    public function delete ($id) {
        $task = Task::find($id);
        if ( $task === null ) {
            return response(null, 404);
        }

        $success = $task->delete();
        if ( $success ) {
            return response(null, 204);
        }
        else {
            return response("Erreur de suppression", 500);
        }
    }
}
