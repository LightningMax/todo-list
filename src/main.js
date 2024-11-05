import { Lists } from "./components/menu-list.js";


class App {
    constructor(lists) {
        this.lists = lists
    }
}

const lists = new Lists()
const app = App(lists)