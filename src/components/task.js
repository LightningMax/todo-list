/*
  BUG:
    This function should return false if the field
    is not valid, otherwise return true
*/
export const isFieldValid = (field, message) => {
  if (field.trim() === "") {
    alert(message);
    return true;
  }
  return false;
};

/* 
  Refact:
    - Each element in the todo list should have a class
    instead of a unique id
    - each id/class should be written in kebab-case instead
    of camelCase
      Ex: dateTask id shoud be called task-date and should be a classList
*/
export const createTodoList = (listId, listTitle) => {
  const div = document.createElement("div");
  div.id = `${listId}-content`;

  const titleList = document.createElement("h2");
  titleList.textContent = listTitle;

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.classList = "task-name";
  inputText.placeholder = "Add a new task";

  const inputDate = document.createElement("input");
  inputDate.type = "date";
  inputDate.id = "dateTask";

  const btnAddTask = document.createElement("button");
  btnAddTask.id = "addTaskButton";
  btnAddTask.textContent = "Add Task";
  btnAddTask.onclick = () => addTask(div.id);

  const listTask = document.createElement("ul");
  listTask.id = "taskList";

  const fieldset = document.createElement("fieldset");

  const legend = document.createElement("legend");
  legend.textContent = "Task Finished";

  // Refact: change finishListTask to finishedTasks
  const finishListTask = document.createElement("ul");
  finishListTask.id = "finishTaskList";

  div.append(titleList, inputText, inputDate, btnAddTask, listTask, fieldset);
  fieldset.append(legend, finishListTask);
  document.body.appendChild(div);
};

const createTask = (taskText, taskDate) => {
  const countTask = document.querySelectorAll(".task").length;
  const li = document.createElement("li");
  li.className = "task";
  li.id = `task-${countTask + 1}`;
  li.textContent = `${taskText}   ${taskDate.split("-").reverse().join("/")}`;

  const deleteButton = document.createElement("button");
  deleteButton.id = `delete-${li.id}`;
  deleteButton.textContent = "Delete";
  deleteButton.style.display = "none";
  deleteButton.onclick = () =>
    deleteChild(document.getElementById("finishTaskList"), li);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onchange = () => taskStatus(li, deleteButton, checkBox);

  li.append(checkBox, deleteButton);

  return li;
};

export const deleteChild = (parentNode, targetTask) => {
  parentNode.removeChild(targetTask);
};

/* 
  BUG:
    - taskStatus will append a new task to the first list
*/
const taskStatus = (li, deleteButton, checkBox) => {
  const taskList = document.getElementById("taskList");
  const finishList = document.getElementById("finishTaskList");

  if (checkBox.checked) {
    deleteButton.style.display = "inline";
    finishList.appendChild(li);
  } else {
    deleteButton.style.display = "none";
    taskList.appendChild(li);
  }
};

export const addTask = (listContentId) => {
  const taskInputText = document.querySelector(`#${listContentId} .task-name`);
  const taskInputDate = document.getElementById("dateTask");

  if (isFieldValid(taskInputText.value, "You need to fill in the field")) {
    return;
  }
  // Refact: This block of code should be inside isFieldValid
  const newTask = createTask(taskInputText.value, taskInputDate.value);
  const taskList = document.querySelector(`#${listContentId} #taskList`);
  taskList.appendChild(newTask);
  taskInputText.value = "";
  taskInputDate.value = "";
};
