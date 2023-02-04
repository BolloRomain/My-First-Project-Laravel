<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function list()
    {
        // Rehcerche la liste de toutes les tâches grace au Model
        $tasks = Task::all();

        // Renvoie le résultat
        return response()->json($tasks);

        // Version simplifiée
        // return response()->json(Task::all());
    }


    /**
     * Recherche d'une tache en fonciton de son id
     * Copyright Antoine
     *
     * @param [type] $id
     * @return String|Task
     */
    public function read ($id) {
        $task = Task::find($id);

        if ($task === null) {
            return response("la tache n'existe pas", 404);
        }

        return response()->json($task);
    }


    /**
     * Undocumented function
     * Copyright Louise
     *
     * @param Request $request fournit par Laravel pour extraire les infos du body
     * @return String|Task
     */
    public function create (Request $request) {
        // Extraction des information soumises, grace à l'obet $request fourni par Laravel
        $title = $request->input('title');

        // Vérification de l'intégrité des données
        if ( empty($title) ) {
            return response("Le titre n'est pas renseigné", 400);
        }

        // Crée une nouvelle tâche
        $task = new Task();
        $task->title = $title;
        $success = $task->save();

        if ( $success ) {
            // On retourne le nouvel objet pour pouvoir l'afficher et avoir son id également
            return response()->json($task, 201);
        }
        else {
            return response("erreur lors de la création de la tâche", 500);
        }
    }


    /**
     * Modification d'une tache
     * Copyright Ayesha
     *
     * @param [type] $id
     * @param Request $request
     * @return void
     */
    public function update ($id, Request $request) {
        // Extraction des information soumisse, grace à l'obet $request fournit par Laravel
        $title = $request->input('title');
        // $status = $request->input('status');

        // Vérification de l'intégrité des données
        if(empty($title)){
            return response("Le titre n'est pas renseigné", 400);
        }
        // if(empty($status)){
        //     return response("Le status n'est pas renseigné", 400);
        // }

        // Recherche la tâche demandée
        $task = Task::find($id);
        // vérfier que la tâche existe
        if ($task === null) {
            // renvoie une reponse en erreur
            return response("La tâche demandée n'éxiste pas", 404);
        }

        $task->title = $title; // va passer par methode magique __set
        // $task->status = $status;
        $success = $task->save();

        if($success){
            // on retourne le nouvel objet pour pouvoir l'afficher et avoir son id également
            return response()->json($task, 201);
        }
        else {
            return response("Erreur de modification", 500);
        }
    }


    /**
     * Suppresison d'une tache spécifique
     * Copyright Erwan
     *
     * @param [type] $id
     * @return void
     */
    public function delete ($id) {
        // Recherche la tache demandée
        $task = Task::find($id);
        // Je vérifier que la tache existe
        if ( $task === null ) {
            // Renvoi une reponse en erreur
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
