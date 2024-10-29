import { addTask } from "./components/task.js";
import { addList } from "./components/menu-list.js";

document.getElementById("add-task-button").addEventListener("click", addTask);
addList()