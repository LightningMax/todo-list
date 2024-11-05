import { Tasks } from "./task.js";

class TodoLists {
  constructor() {
    this.TodoLists = [];
  }
}

export class TodoList {
  constructor(listId, title) {
    this.listId = listId;
    this.id = `${this.listId}-content`;
    this.title = title;
    this.tasks = new Tasks(this.id);
    this.element = this.createTodoElement();
  }

  createTodoElement() {
    const div = document.createElement("div");
    div.classList.add("todo-container");
    div.id = this.id;

    const titleList = document.createElement("h2");
    titleList.textContent = this.title;

    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.classList.add("task-name");
    inputText.placeholder = "Add a new task";

    const inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.classList.add("task-date");

    const btnAddTask = document.createElement("button");
    btnAddTask.classList.add("add-task-button");
    btnAddTask.textContent = "Add Task";
    btnAddTask.onclick = () => this.tasks.addTask();

    const listTask = document.createElement("ul");
    listTask.classList.add("task-list");

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "Task Finished";

    const finishedTasks = document.createElement("ul");
    finishedTasks.classList.add("finished-tasks");

    div.append(titleList, inputText, inputDate, btnAddTask, listTask, fieldset);
    fieldset.append(legend, finishedTasks);
    document.body.appendChild(div);
  }
}
