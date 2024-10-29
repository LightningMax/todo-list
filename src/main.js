import {
  addTask,
  createStructureTask,
  deleteChild,
  taskStatus,
} from "./components/task.js";

import { 
  addList 
} from "./components/menu-list.js";

document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("removeTask").addEventListener("click", deleteChild);
document.getElementById("checkbox").addEventListener("click", taskStatus);
//call createStructureTask() when the list create is call
addList()

