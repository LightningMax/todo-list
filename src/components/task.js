export const isFieldValid = (field, message) => {
  if (field.trim() === "") {
    alert(message);
    return false;
  }
  return true;
};

export class Tasks {
  constructor(listContentId) {
    this.tasks = [];
    this.listContentId = listContentId;
  }

  addTask() {
    const taskInputText = document.querySelector(
      `#${this.listContentId} .task-name`
    );
    const taskInputDate = document.querySelector(
      `#${this.listContentId} .task-date`
    );

    if (
      isFieldValid(taskInputText.value, "You need to fill in the field") &&
      isFieldValid(taskInputDate.value, "You need to pick a date")
    ) {
      const task = new Task(
        taskInputText.value,
        taskInputDate.value,
        this.listContentId
      );
      this.tasks.push(task);

      const taskList = document.querySelector(
        `#${this.listContentId} .task-list`
      );
      taskList.appendChild(task.element);

      taskInputText.value = "";
      taskInputDate.value = "";
    }
  }
}

class Task {
  constructor(title, date, listContentId) {
    this.title = title;
    this.date = date;
    this.listContentId = listContentId;
    this.element = this.createTaskElement();
  }

  createTaskElement() {
    const countTask = document.querySelectorAll(
      `#${this.listContentId} .task`
    ).length;
    const li = document.createElement("li");
    li.className = "task";
    li.id = `task-${countTask + 1}`;

    const divInfoTask = document.createElement("div");
    divInfoTask.className = "info-task";

    const infoText = document.createElement("span");
    infoText.id = `text-task-${countTask + 1}`;
    infoText.textContent = this.title;
    const infoDate = document.createElement("span");
    infoDate.id = `date-task-${countTask + 1}`;
    infoDate.textContent = this.date.split("-").reverse().join("/");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task");
    deleteButton.textContent = "Delete";
    deleteButton.style.display = "none";
    deleteButton.onclick = () =>
      this.deleteChild(
        document.querySelector(`#${this.listContentId} .finished-tasks`),
        li
      );

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    checkBox.onchange = () =>
      this.toggleTaskStatus(li, deleteButton, checkBox, this.listContentId);

    divInfoTask.appendChild(infoText);
    divInfoTask.appendChild(infoDate);
    li.append(checkBox, divInfoTask, deleteButton);

    return li;
  }

  toggleTaskStatus(li, deleteButton, checkBox, listContentId) {
    const taskList = document.querySelector(`#${listContentId} .task-list`);
    const finishList = document.querySelector(
      `#${listContentId} .finished-tasks`
    );

    if (checkBox.checked) {
      deleteButton.style.display = "inline";
      finishList.appendChild(li);
    } else {
      deleteButton.style.display = "none";
      taskList.appendChild(li);
    }
  }

  deleteChild(parentNode, targetTask) {
    parentNode.removeChild(targetTask);
  }
}
