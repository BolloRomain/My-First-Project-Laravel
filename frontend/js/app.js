const app = {

    init: function () {
        TaskModule.init();

        console.log("app initialisée");
    }

}

// A eviter car des scripts ne sont peut etre pas encore là
// app.init();

// Le navigateur lancera la méthode demandée que quand il sera prêt
document.addEventListener('DOMContentLoaded', app.init);