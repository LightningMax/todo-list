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

    const titleElement = document.createElement("h3");
    titleElement.textContent = `Modify List: ${this.title}`;

    const taskList = document.createElement("ul");
    taskList.classList.add("modify-task-list");

    if (this.tasks.length === 0) {
      const noElementsMessage = document.createElement("li");
      noElementsMessage.textContent = "No elements";
      taskList.appendChild(noElementsMessage);
    } else {
      this.tasks.forEach((task) => {
        const taskElement = document.createElement("li");
        taskElement.textContent = `${task.title} - ${task.date}`;
        taskList.appendChild(taskElement);
      });
    }

    modifyListContainer.appendChild(closeButton);
    modifyListContainer.appendChild(titleElement);
    modifyListContainer.appendChild(taskList);

    document.body.appendChild(modifyListContainer);
  }
}
