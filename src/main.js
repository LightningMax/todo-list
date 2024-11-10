import { Lists } from "./components/menu-list.js";
import { TodoLists } from "./components/todo-list.js";
import {
  loadData,
  saveData,
  exportData,
  importData,
  createButtons,
} from "./components/storage.js";

class App {
  constructor() {
    this.todoLists = new TodoLists();
    this.lists = new Lists(this.todoLists);
  }

  initialize() {
    this.lists.initializer();
    loadData();
    createButtons();
    window.addEventListener("beforeunload", saveData);
  }
}

const app = new App();
app.initialize();
