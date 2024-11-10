import { TodoList } from "./todo-list.js";

export class Lists {
  constructor(todoLists) {
    this.lists = [];
    this.todoLists = todoLists;
  }

  initialize() {
    const addListButton = document.getElementById("add-list-button");
    addListButton.onclick = () => {
      this.showModal();
      this.addList();
    };
  }

  createList(title) {
    const countLists = document.querySelectorAll(".list").length;
    const listId = `list-${countLists + 1}`;

    const list = new List(listId, title, this.showTodoList.bind(this));
    this.lists.push(list);

    const todoList = new TodoList(listId, title);
    this.showTodoList(listId);
    this.todoLists.addTodoList(todoList);
  }

  showTodoList(listId) {
    this.todoLists.showCurrentList(listId);
  }

  addList() {
    const confirmAddList = document.getElementById("confirm-add-list");
    const input = document.getElementById("new-list");

    confirmAddList.onclick = () => this.createList(input.value);
    input.value = "";
  }

  showModal() {
    const listModal = document.getElementById("list-modal");
    listModal.showModal();
  }
}

class List {
  constructor(id, title, showTodoListCallback) {
    this.showTodoList = showTodoListCallback;
    this.title = title;
    this.id = id;
    this.body = this.createBody();
  }

  createBody() {
    const menuList = document.getElementById("menu-list");
    const li = document.createElement("li");
    li.className = "list";
    li.id = this.id;

    const btn = document.createElement("button");
    btn.classList = "list-button";
    const btnCount = document.querySelectorAll(".list-button").length;
    const listTitle = this.title || "New list";
    btn.textContent = listTitle;
    btn.id = `list-button-${btnCount + 1}`;
    btn.onclick = () => this.showTodoList(this.id);
    li.appendChild(btn);
    menuList.appendChild(li);

    return li;
  }
}
