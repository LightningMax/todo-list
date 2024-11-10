import { Lists } from "./menu-list.js";
import { loadData, saveData, exportData, importData, createButtons } from "./storage.js";


class App {
  constructor(lists) {
    this.lists = new Lists();
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