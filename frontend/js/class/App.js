/*
    Quelle flemarde cette App, elle fait que ça O_o
*/
class App {
    constructor () {
        new TaskController();
    }
}


// Qu'est ce qu'il se passe ici ?!?
// Pas de panique, maintenant je suis obligé d'instancier un 'App' pour l'initialiser
// Du coup c'est une instruction, je peux plus le faire directement dans mon addEventListener
// J'imbrique juste mon instruction dans une fonction fléchée et tout va bien
// Plus d'info :
//      -> https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/Arrow_functions
document.addEventListener('DOMContentLoaded', () => {
    new App();
} );