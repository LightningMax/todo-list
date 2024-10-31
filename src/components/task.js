export const isFieldValid = (field, message) => {
  if (field.trim() === "") {
    alert(message);
    return true;
  }
  return false;
};

export const createStructureTask = (listId, listTitle) => {
  const div = document.createElement("div");
  div.id = `${listId}-content`;

  const titleList = document.createElement("h2")
  titleList.textContent = listTitle;

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

  div.append(titleList)
  div.appendChild(inputText);
  div.appendChild(inputDate);
  div.appendChild(btnAddTask);

  div.appendChild(fieldset);
  fieldset.appendChild(legend);
  fieldset.appendChild(finishListTask);
  document.body.appendChild(div);

  const deleteButton = document.createElement("button");
  deleteButton.id = "removeTask";
  deleteButton.textContent = "Delete";
  deleteButton.style.display = "none";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
};

export const addTask = () => {
  const taskText = document.getElementById("nameTask").value;
  const taskDate = document.getElementById("dateTask").value;

  if (isFieldValid(taskText, "You need to fill in the field") === true) {
    return;
  }

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.id = "task";
  taskDate = taskDate.split("-").reverse().join("-");
  li.textContent = taskText + "   " + taskDate;

  li.appendChild(document.getElementById("removeTask"));

  const checkBox = document.getElementById("checkbox");

  const finishList = document.getElementById("finishTaskList");

  li.appendChild(checkBox);
  taskList.appendChild(li);

  taskInputText.value = "";
  taskInputDate.value = "";
};

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
