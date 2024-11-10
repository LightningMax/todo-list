export class ModifyTask {
  constructor(listId, title, tasks, modifyCallback) {
    this.listId = listId;
    this.title = title;
    this.tasks = tasks;
    this.modifyCallback = modifyCallback;
    this.element = this.createModifyButton();
  }

  createModifyButton() {
    const button = document.createElement("button");
    button.textContent = "Modify";
    button.onclick = () => this.showModifyList();
    return button;
  }

  showModifyList() {
    const modifyListContainer = document.createElement("div");
    modifyListContainer.classList.add("modify-list-container");

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.onclick = () => modifyListContainer.remove();

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = this.title;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.onclick = () => {
      const updatedTasks = Array.from(
        document.querySelectorAll(".modify-task-list input")
      ).map((input) => ({
        title: input.value,
        date: input.nextElementSibling.value,
      }));
      this.modifyCallback(this.listId, titleInput.value, updatedTasks);
      modifyListContainer.remove();
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

    modifyListContainer.appendChild(closeButton);
    modifyListContainer.appendChild(document.createElement("br"));
    modifyListContainer.appendChild(document.createTextNode("Title:"));
    modifyListContainer.appendChild(document.createElement("br"));
    modifyListContainer.appendChild(titleInput);
    modifyListContainer.appendChild(document.createElement("br"));
    modifyListContainer.appendChild(document.createTextNode("Tasks:"));
    modifyListContainer.appendChild(document.createElement("br"));
    modifyListContainer.appendChild(taskList);
    modifyListContainer.appendChild(document.createElement("br"));
    modifyListContainer.appendChild(saveButton);

    document.body.appendChild(modifyListContainer);
  }
}
