import lists from "./components/menu-list.js";
import importExport from "./components/storage.js";

class App {
  constructor() {
    this.lists = lists;
  }

  initialize() {
    this.lists.initialize();
    importExport()
  }
}

const app = new App();
app.initialize();
