import { Lists } from "./components/menu-list.js";
import { TodoLists } from "./components/todo-list.js";
import { exportDataAsCSV, importDataFromCSV, createButtons } from "./components/storage.js";

class App {
  constructor() {
    this.todoLists = new TodoLists();
    this.lists = new Lists(this.todoLists);
  }

  initialize() {
    this.lists.initialize();
    createButtons();
  }
}

const app = new App();
app.initialize();
