import { Tasks } from "./task.js";

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
    button.textContent = "Modify";
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

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = this.title;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Changes";
    saveButton.onclick = () => {
      const taskListElement = document.querySelector(`#${this.listId}-content .task-list`);
      console.log(this.title)
      const listTitle = document.querySelector(`#${this.listId} button`)
      listTitle.textContent = titleInput.value;
      // Clear the existing tasks in the UI
      taskListElement.innerHTML = "";
      
      // Get tasks from modification view and add them to the UI using addTask
      const taskElements = document.querySelectorAll(".modify-task-item");
      const updatedTasks = []; // Store the updated tasks

      taskElements.forEach((taskElement) => {
        const taskTitleInput = taskElement.querySelector("input[type='text']");
        const taskDateInput = taskElement.querySelector("input[type='date']");
        const taskCompletedCheckbox = taskElement.querySelector("input[type='checkbox']");

        const updatedTask = {
          title: taskTitleInput.value,
          date: taskDateInput.value,
          completed: taskCompletedCheckbox.checked,
        };

        // Add updated task to the array
        updatedTasks.push(updatedTask);

        // Add the task to the tasks instance
        this.tasksInstance.addTask(taskTitleInput.value, taskDateInput.value, taskCompletedCheckbox.checked, true);
        
      });
      const mod = document.querySelector(".modify-list-container div")
      mod.remove()
      titleInput.value = this.title;

      // Update the tasks array with the updated tasks
      this.tasks = updatedTasks;

      // Update the list title in the UI
      const listTitleElement = document.querySelector(`#${this.listId}-content h2`);
      listTitleElement.textContent = titleInput.value;

      // Close the modification dialog

      modifyListContainer.remove();
      this.verify = false;
    };

    const taskList = document.createElement("ul");
    taskList.classList.add("modify-task-list");

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
