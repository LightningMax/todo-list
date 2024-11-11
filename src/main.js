import lists from "./components/menu-list.js";
import createButtons from "./components/storage.js";

class App {
  constructor() {
    this.lists = lists;
  }

  initialize() {
    this.lists.initialize();
    createButtons();
  }
}

const app = new App();
app.initialize();
