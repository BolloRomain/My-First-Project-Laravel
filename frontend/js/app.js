const app = {

    init: function () {
        TaskModule.init();

        console.log("app initialisée");
    }

}

document.addEventListener('DOMContentLoaded', app.init);