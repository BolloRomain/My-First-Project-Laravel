const TaskModule = {

    container: null,
    modal: null,
    input_title: null,

    init: function () {
        TaskModule.showList();

        TaskModule.container = document.querySelector('.tasklist');
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


    showList: async function () {
        const tasks = await TaskModule.getTasks();

        console.log('showList', tasks);

        for (const task of tasks) {

            TaskModule.addTaskToDom(task);
        }
    },

    handleDeleteTask: async function (event) {

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

        event.preventDefault();

        const data = {
            title: TaskModule.input_title.value
        };
        
        const response = await TaskModule.addTask(data);
        
        if ( typeof response === "number" ) {
            TaskModule.showErrorMessage(response);
        }
        else {
            TaskModule.toggleModal();
            TaskModule.addTaskToDom(response);
        }
    },

    getTasks: async function () {
        const response = await fetch("http://127.0.0.1:8000/api/tasks");
        const tasks = await response.json();

        console.log('getTasks', tasks);
        return tasks;
    },

    deleteTask: async function (id) {
        const response = await fetch("http://127.0.0.1:8000/api/tasks/" + id, {
            method: "DELETE"
        });

        if ( response.ok ) return true;
        else return response.status;
    },

    addTask: async function (data) {
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

    addTaskToDom: function (data) {

        const li = document.createElement('li');
        li.dataset.id = data.id

        const p = document.createElement('p');
        p.textContent = data.title

        const d = document.createElement('div');
        d.classList.add('delete');
        d.addEventListener('click', TaskModule.handleDeleteTask);

        const e = document.createElement('div');
        e.classList.add('edit');

        li.append(p, d, e);

        TaskModule.container.append(li);
    },


    deleteTaskFromDOM (li) {
        li.remove();
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
        TaskModule.input_title.value = '';
        TaskModule.modal.classList.toggle('show');
    }
}