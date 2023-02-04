/**
 * Module dédié à la gestion des tâches
 * Il gère la communication avec l'api + les interactions utilisateur + la gestion du DOM
 * 
 * Déroulement du process principal :
 *      0. Chrome lit tout notre code JS et l'interprète
 *      1. Initialisation du module depuis app.init -> appel de TaskModule.init()
 *           a. Récupération des éléments du DOM
 *           b. Demande l'affichage des tâches
 *           c. log terminé
 *      2. Module initialisé, mais mes tâches ne sont pas encore là o_O
 * 
 * Déroulement du process secondaire 1.b :
 *      v. Demande des données à l'api
 *      w. On attends gentillement ;)
 *      x. Les données sont là
 *      y. J'ajoute chaque tâche au DOM
 *      z. Mon interface est à jour !
 */
const TaskModule = {

    // Propriétés du module
    // Container DOM (ul) pour insérer les taches (li)
    // On déclare avec null car le DOM n'est (peut etre) pas encore tout construit (merci l'asynchrone ^^)
    // querySelector peut ne pas donner le résultat escompté
    container: null,
    modal: null,
    input_title: null,


    /**
     * Initialise de module
     * init est appelé par app.init qui est lui même appelé au DOMContentLoaded
     * DOMContentLoaded = le navigateur est prêt, il a tout charger (DOM + scripts js)
     */
    init: function () {
        // Demande l'affichage des taches
        // Cette méthode est asynchrone = JS va la lancer en arrière plan
        // On va passer à la suite directement donc attention, il ne faut pas se baser sur ce qu'elle va faire dans le futur (pour le moment)
        TaskModule.showList();


        // Récupération des éléments HTML nécessaires pour la suite
        // DOMContentLoaded à été déclenché donc le DOM est prêt, le querySelector va fonctionner
        TaskModule.container = document.querySelector('.tasklist');
        // On fait un nettoyage du conteneur pour partir sur une base propre
        TaskModule.container.textContent = '';

        // Récupération de la modal
        TaskModule.modal = document.querySelector('.modal-dialog');
        TaskModule.input_title = TaskModule.modal.querySelector('#task-title');
        TaskModule.modal.querySelector('form').addEventListener('submit', TaskModule.handleSubmitModal);

        // Bouton pour afficher la modal
        const btnShowModal = document.querySelector('.create-task-container button');
        btnShowModal.addEventListener('click', TaskModule.handleClickShowModal);

        // Le module a finit d'être initialisé AU PREMIER PLAN. Les tâches en arrière plan continuent
        console.log("TaskModule initalisé");
    },



    /**
     * Gère l'affichage de la liste de toutes les tâches
     * @return Promise : par défaut une fonction async retourne une promesse
     */
    showList: async function () {
        // Récupère les données via l'api, la méthode getTasks est dédiée à ça
        // Elle est async donc on va attendre (await) pour bénéficier de la liste des tâches
        // Cette méthode prend un temps inconnu de secondes pour s'exécuter
        const tasks = await TaskModule.getTasks();

        // Ma liste est prête !
        console.log('showList', tasks);

        // Parcours la liste pour ajouter chaque tâche au DOM
        // For of parcours la liste (tableau indexé) et me fournit un élément à chaque itération
        for (const task of tasks) {
            // Appel la méthode dédiée à l'ajout dans le DOM
            TaskModule.addTaskToDom(task);
        }

        // Branchement de l'event fonctionnel mais pas optimum
        // Aller voir dans addTaskToDom
        // const list = document.querySelectorAll('.delete');
        // for (const elt of list) {
        //     elt.addEventListener('click', TaskModule.deleteTaskFromDOM);
        // }
    },

    handleDeleteTask: async function (event) {
        // closest est un querySelector inversé (il remonte dans le DOM)
        // Ici on récupère le parent li le plus proche
        // event.currentTarget.closest('li');

        const li = event.currentTarget.parentElement;
        const id = li.dataset.id;

        const success = await TaskModule.deleteTask(id);
        if ( success === true ) {
            TaskModule.deleteTaskFromDOM(li);
        }
        else {
            TaskModule.showErrorMessage(success);
        }
    },

    handleClickShowModal: function (event) {
        TaskModule.toggleModal()
    },

    handleSubmitModal: async function (event) {
        // Ici on dit au navigateur de ne pas le faire lui meme, on s'en occupe
        event.preventDefault();

        // Récupère les données pour les envoyer
        const data = {
            title: TaskModule.input_title.value
        };
        
        // Envoie la requete et récupère un json ou un code erreur
        const response = await TaskModule.addTask(data);
        
        // Si c'est un nombre, j'ai un code erreur
        if ( typeof response === "number" ) {
            TaskModule.showErrorMessage(response);
        }
        else {
            TaskModule.toggleModal();
            TaskModule.addTaskToDom(response);
        }
    },


    /**
     * Récupération de toutes les taches depuis l'api
     * @return Promise|Array : par défaut une fonction async retourne une promesse, si on awit elle renverra une liste de tâches
     */
    getTasks: async function () {
        // Faire la requete avec fetch
        const response = await fetch("http://127.0.0.1:8000/api/tasks");
        // Extraction des données 
        const tasks = await response.json();

        // Les données sont prêtes, je peux les renvoyer à l'appelant
        console.log('getTasks', tasks);
        return tasks;
    },

    deleteTask: async function (id) {
        // Faire la requete avec fetch
        const response = await fetch("http://127.0.0.1:8000/api/tasks/" + id, {
            method: "DELETE"
        });

        if ( response.ok ) return true;
        else return response.status;
    },

    addTask: async function (data) {
        // Faire la requete avec fetch
        const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if ( response.ok ) {
            return await response.json();
        }
        else {
            return response.status;
        }
    },



    /**
     * Ajout d'une tache dans le DOM
     * @param {JOSN} data représent une ligne dans la table tasks
     */
    addTaskToDom: function (data) {
        // Recrée la structure avec le JS
        /*<li data-id="0">
            <p>sortir les poubelles</p>
            <div class="delete"></div>
            <div class="edit"></div>
        </li>*/

        // => On a un li qui va contenir 1 p et 2 div

        // Création de chaque éléments
        const li = document.createElement('li');
        li.dataset.id = data.id

        const p = document.createElement('p');
        p.textContent = data.title

        const d = document.createElement('div');
        d.classList.add('delete');
        // Branchement du click directement car je suis en train de le créer
        // Alors autant le créer entièrement ;)
        d.addEventListener('click', TaskModule.handleDeleteTask);

        const e = document.createElement('div');
        e.classList.add('edit');

        // Ajoute les sous éléments au li => 1 p et 2 div
        li.append(p, d, e);

        // Ajoute le li au conteneur ul
        // Le conteneu ul est déjà dans le DOM donc le li va apparaître dans le DOM :)
        TaskModule.container.append(li);
    },


    deleteTaskFromDOM (li) {
        li.remove();
        // Animation du body
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "unset";
        }, 150);

    },


    showErrorMessage: function (code) {
        switch (code) {
            case 404:
                console.log("Je n'ai pas trouvé la tache à supprimer");
                break;
            case 500:
                console.log("Erreur sur le serveur, je n'en sais pas plus");
                break;
            default:
                console.log("Code erreur inconnu, cadeau");
                break;
        }
    },


    toggleModal: function () {
        // Nettoye les input
        TaskModule.input_title.value = '';
        // Bascule l'affichage
        TaskModule.modal.classList.toggle('show');
    }
}