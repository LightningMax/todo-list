export class ModifyTask {
  constructor(listId, title, tasks, modifyCallback) {
    this.verify = false;
    this.listId = listId;
    this.title = title;
    this.tasks = tasks;
    this.modifyCallback = modifyCallback;
    this.element = this.createModifyButton();
  }

  createModifyButton() {
    const button = document.createElement("button");
    button.textContent = "Modify";
    console.log(this.verify, "start");
    button.onclick = () => {
      if (this.verify === false) {
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
      console.log(this.verify, "delete1");
      modifyListContainer.remove();
      this.verify = false;
      console.log(this.verify, "delete2");
    };

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = this.title;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.onclick = () => {
      console.log(this.verify, "save1");
      const updatedTasks = [];
      const taskElements = document.querySelectorAll(".modify-task-list li");
      taskElements.forEach((taskElement) => {
        const taskTitleInput = taskElement.querySelector("input[type='text']");
        const taskDateInput = taskElement.querySelector("input[type='date']");
        if (taskTitleInput && taskDateInput) {
          updatedTasks.push({
            title: taskTitleInput.value,
            date: taskDateInput.value,
          });
        }
      });
      this.modifyCallback(this.listId, titleInput.value, updatedTasks);
      modifyListContainer.remove();
      this.verify = false;
      console.log(this.verify, "save2");
    };

    const taskList = document.createElement("ul");
    taskList.classList.add("modify-task-list");

    if (this.tasks.length === 0) {
      const noElementsMessage = document.createElement("li");
      noElementsMessage.textContent = "No elements";
      taskList.appendChild(noElementsMessage);
    } else {
      this.tasks.forEach((task) => {
        const taskElement = document.createElement("li");

        const taskTitleInput = document.createElement("input");
        taskTitleInput.type = "text";
        taskTitleInput.value = task.title;

        const taskDateInput = document.createElement("input");
        taskDateInput.type = "date";
        taskDateInput.value = task.date;

        taskElement.appendChild(taskTitleInput);
        taskElement.appendChild(taskDateInput);

        taskList.appendChild(taskElement);
      });
    }

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title-container");
    titleContainer.appendChild(document.createTextNode("Title:"));
    titleContainer.appendChild(titleInput);

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");
    tasksContainer.appendChild(document.createTextNode("Tasks:"));
    tasksContainer.appendChild(taskList);

    modifyListContainer.append(
      closeButton,
      titleContainer,
      tasksContainer,
      saveButton
    );

    document.body.appendChild(modifyListContainer);
  }
}
