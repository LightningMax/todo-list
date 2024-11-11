import lists from "./components/menu-list.js";

class App {
  constructor() {
    this.lists = lists;
  }

  initialize() {
    this.lists.initialize();
    
  }
}

const app = new App();
app.initialize();
