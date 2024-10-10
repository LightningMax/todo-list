function validateForm() {
    let x = document.forms["add-task"]["task-name"].value;
    if (x == "") {
        alert("You need to fill the champ");
        return false;
    }
    return true;
};

function addTask() {}
function removeTask() {}
function modifyTask() {}


// ajouter des taches
// supprimer des taches
// modifer des taches