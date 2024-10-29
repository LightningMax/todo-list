// Checks if the input field is empty. If it is, shows an alert message and returns true; otherwise, returns false.
export const isFieldValid = (field, message) => {
  if (field.trim() === "") {
    alert(message);
    return true;
  }
  return false;
};

// Creates the HTML structure for the task list, including inputs for task name and date, an "Add Task" button,
// and sections for tasks and finished tasks.
// createStructureTask() must be run in a list created to have this structure in each list.
export const createStructureTask = () => {
  const div = document.createElement("div");
  div.id = "containerTask";

  const titleList = document.getElementById("nameList"); // Check if the id is the right one for the lists
  titleList.textContent = "";

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "nameTask";
  inputText.placeholder = "Add a new task";

  const inputDate = document.createElement("input");
  inputText.type = "date";
  inputText.id = "dateTask";

  const btnAddTask = document.createElement("button");
  btnAddTask.id = "addTaskButton";
  btnAddTask.textContent = "Add Task";

  const listTask = document.createElement("ul");
  listTask.id = "taskList";

  const fieldset = document.createElement("fieldset");

  const legend = document.createElement("legend");
  legend.textContent = "Task Finished";

  const finishListTask = document.createElement("ul");
  finishListTask.id = "finishTaskList";

  div.appendChild(titleList);
  div.appendChild(inputText);
  div.appendChild(inputDate);
  div.appendChild(btnAddTask);

  div.appendChild(fieldset);
  fieldset.appendChild(legend);
  fieldset.appendChild(finishListTask);

  const deleteButton = document.createElement("button");
  deleteButton.id = "removeTask";
  deleteButton.textContent = "Delete";
  deleteButton.style.display = "none";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
};

//add new task with name and date enter (this function use isFieldValid())
export const addTask = () => {
  const taskText = document.getElementById("nameTask").value; //get data name task
  const taskDate = document.getElementById("dateTask").value; //get data date task

  if (isFieldValid(taskText, "You need to fill in the field") === true) {
    //verify if data name task is not empty, if empty stop addTask()
    return;
  }

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li"); //create new task  with data name task and data date task
  li.id = "task";
  taskDate = taskDate.split("-").reverse().join("-");
  li.textContent = taskText + "   " + taskDate;

  li.appendChild(document.getElementById("removeTask")); //add the delete button to the task

  const checkBox = document.getElementById("checkbox");

  const finishList = document.getElementById("finishTaskList");

  li.appendChild(checkBox); //add the checkbox to the task
  taskList.appendChild(li); //add the task to the task list

  taskInputText.value = ""; //reset data name task
  taskInputDate.value = ""; //reset data date task
};

// get parents and child and delete the child
export const deleteChild = (parentNode, targetTask) => {
  parentNode.removeChild(targetTask);
};

//moves the task to the correct list depending on whether its checkbox is checked
export const taskStatus = () => {
  const taskList = document.getElementById("listTask");
  const finishList = document.getElementById("finishTaskList");
  const li = document.getElementById("task");
  const deleteButton = document.getElementById("removeTask");

  if (checkBox.checked) {
    deleteButton.style.display = "inline";
    finishList.appendChild(li);
    taskList.removeChild(li);
  } else {
    deleteButton.style.display = "none";
    taskList.appendChild(li);
    finishList.removeChild(li);
  }
};
