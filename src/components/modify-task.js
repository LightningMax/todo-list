export class ModifyTask {
  constructor(listId, title, tasks, tasksInstance) {
    this.verify = false;
    this.listId = listId;
    this.title = title;
    this.tasks = tasks;
    this.tasksInstance = tasksInstance;
    this.element = this.createModifyButton();
  }

  createModifyButton() {
    const button = document.createElement("button");
    button.classList.add("modify-task-button");
    button.onclick = () => {
      if (!this.verify) {
        this.showModifyList();
        this.verify = true;
      } else {
        alert("Modify is already enabled");
      }
    };
    return button;
  }

  showModifyList() {
    const modifyListContainer = document.createElement("div");
    modifyListContainer.classList.add("modify-list-container");

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.onclick = () => {
      modifyListContainer.remove();
      this.verify = false;
    };

    // Input pour le titre de la liste (initialisé avec le titre actuel)
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = this.title;  // Le titre actuel de la liste

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Changes";
    saveButton.onclick = () => {
      const taskListElement = document.querySelector(`#${this.listId}-content .task-list`);

      // Effacer les tâches existantes dans l'UI
      taskListElement.innerHTML = "";

      // Mettre à jour le titre de la liste
      const listTitle = document.querySelector(`#${this.listId} button`);
      listTitle.textContent = titleInput.value;  // Modifier le texte du bouton (titre de la liste)

      // Mettre à jour la variable `this.title` avec le nouveau titre
      this.title = titleInput.value;  // Mise à jour de `this.title`

      // Ajouter les tâches modifiées dans la liste
      const taskElements = document.querySelectorAll(".modify-task-item");
      const updatedTasks = []; // Stocke les tâches mises à jour

      taskElements.forEach((taskElement) => {
        const taskTitleInput = taskElement.querySelector("input[type='text']");
        const taskDateInput = taskElement.querySelector("input[type='date']");
        const taskCompletedCheckbox = taskElement.querySelector("input[type='checkbox']");

        const updatedTask = {
          title: taskTitleInput.value,
          date: taskDateInput.value,
          completed: taskCompletedCheckbox.checked,
        };

        // Ajouter la tâche mise à jour dans le tableau
        updatedTasks.push(updatedTask);

        // Ajouter la tâche à l'instance de tâches
        this.tasksInstance.addTask(taskTitleInput.value, taskDateInput.value, taskCompletedCheckbox.checked, true);
      });

      // Supprimer le conteneur de modification après la sauvegarde
      modifyListContainer.remove();
      this.verify = false;

      // Mettre à jour le tableau de tâches avec les tâches mises à jour
      this.tasks = updatedTasks;

      // Mettre à jour le titre de la liste dans l'UI
      const listTitleElement = document.querySelector(`#${this.listId}-content h2`);
      listTitleElement.textContent = titleInput.value;  // Mettre à jour le titre de la liste affiché dans l'UI
    };

    const taskList = document.createElement("ul");
    taskList.classList.add("modify-task-list");

    // Vider la liste des tâches avant de la remplir avec les tâches modifiées
    taskList.innerHTML = "";

    this.tasks.forEach((task) => {
      const taskElement = document.createElement("li");
      taskElement.classList.add("modify-task-item");

      const taskTitleInput = document.createElement("input");
      taskTitleInput.type = "text";
      taskTitleInput.value = task.title;

      const taskDateInput = document.createElement("input");
      taskDateInput.type = "date";
      taskDateInput.value = task.date;

      const taskCompletedCheckbox = document.createElement("input");
      taskCompletedCheckbox.type = "checkbox";
      taskCompletedCheckbox.checked = task.completed;

      taskElement.appendChild(taskTitleInput);
      taskElement.appendChild(taskDateInput);
      taskElement.appendChild(taskCompletedCheckbox);

      taskList.appendChild(taskElement);
    });

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title-container");
    titleContainer.appendChild(document.createTextNode("Title:"));
    titleContainer.appendChild(titleInput);

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");
    tasksContainer.appendChild(document.createTextNode("Tasks:"));
    tasksContainer.appendChild(taskList);

    modifyListContainer.append(closeButton, titleContainer, tasksContainer, saveButton);
    document.body.appendChild(modifyListContainer);
  }
}
