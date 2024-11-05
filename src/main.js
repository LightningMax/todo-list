import { Lists } from "./components/menu-list.js";

class App {
  constructor(lists) {
    this.lists = new Lists();
  }

  initialize() {
    this.lists.initializer();
  }
}

const app = new App();
app.initialize();
