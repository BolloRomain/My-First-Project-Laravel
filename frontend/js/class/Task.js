class TaskController {

    // Propriétés
    container = null
    modal = null
    input_title = null

    constructor () {
        this.showList();

        this.container = document.querySelector('.tasklist');
        this.container.textContent = '';
    }

    async showList () {
        const tasks = await this.getTasks();
        for (const task of tasks) this.addTaskToDom(task);
    }

    async handleDeleteTask (event) {
        const li = event.currentTarget.parentElement;
        const id = li.dataset.id;

        const success = await this.deleteTask(id);
        if ( success === true ) this.deleteTaskFromDOM(li);
        else this.showErrorMessage(success);
    }

    handleClickShowModal () {
        this.toggleModal();
    }

    async handleSubmitModal (event) {
        event.preventDefault();

        const data = {
            title: this.input_title.value
        };
        
        const response = await this.addTask(data);
        if ( typeof response === "number" ) this.showErrorMessage(response);
        else {
            this.toggleModal();
            this.addTaskToDom(response);
        }
    }



    /*
        Gestion des appels à lAPI ( = un model ?)
    */
    async getTasks () {
        const response = await fetch("http://127.0.0.1:8000/api/tasks");
        const tasks = await response.json();
        return tasks;
    }

    async deleteTask () {
        const response = await fetch("http://127.0.0.1:8000/api/tasks/" + id, {
            method: "DELETE"
        });

        if ( response.ok ) return true;
        else return response.status;
    }

    async addTask () {
        const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if ( response.ok ) return await response.json();
        else return response.status;
    }



    /*
        Gestion du DOM ( = des vues ? )
    */
    addTaskToDom () {
        const li = document.createElement('li');
        li.dataset.id = data.id

        const p = document.createElement('p');
        p.textContent = data.title

        const d = document.createElement('div');
        d.classList.add('delete');
        d.addEventListener('click', this.handleDeleteTask);

        const e = document.createElement('div');
        e.classList.add('edit');

        li.append(p, d, e);
        this.container.append(li);
    }
    
    deleteTaskFromDOM (li) {
        li.remove();
    }
    
    showErrorMessage (code) {
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
    }
    
    toggleModal () {
        this.input_title.value = '';
        this.modal.classList.toggle('show');
    }
}