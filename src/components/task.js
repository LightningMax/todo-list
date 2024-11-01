// Vérifie si le champ est vide, et affiche un message d’alerte si nécessaire
export const isFieldValid = (field, message) => {
  if (field.trim() === "") {
    alert(message);
    return true;
  }
  return false;
};

// Crée une liste de tâches avec les éléments nécessaires
export const createTodoList = (listId, listTitle) => {
  const div = document.createElement("div");
  div.id = `${listId}-content`;

  const titleList = document.createElement("h2");
  titleList.textContent = listTitle;

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "nameTask";
  inputText.placeholder = "Add a new task";

  const inputDate = document.createElement("input");
  inputDate.type = "date";
  inputDate.id = "dateTask";

  const btnAddTask = document.createElement("button");
  btnAddTask.id = "addTaskButton";
  btnAddTask.textContent = "Add Task";
  btnAddTask.onclick = addTask;

  const listTask = document.createElement("ul");
  listTask.id = "taskList";

  const fieldset = document.createElement("fieldset");

  const legend = document.createElement("legend");
  legend.textContent = "Task Finished";

  const finishListTask = document.createElement("ul");
  finishListTask.id = "finishTaskList";

  div.append(titleList, inputText, inputDate, btnAddTask, listTask, fieldset);
  fieldset.append(legend, finishListTask);
  document.body.appendChild(div);
};

export const addTask = () => {
  const taskInputText = document.getElementById("nameTask");
  const taskInputDate = document.getElementById("dateTask");
  if (isFieldValid(taskInputText.value, "You need to fill in the field")) {
    return;
  }
  const newTask = createTask(taskInputText.value, taskInputDate.value);
  const taskList = document.getElementById("taskList");
  taskList.appendChild(newTask);
  taskInputText.value = "";
  taskInputDate.value = "";
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
  deleteButton.onclick = () => deleteChild(document.getElementById("finishTaskList"), li);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onchange = () => taskStatus(li, deleteButton, checkBox);

  li.append(checkBox, deleteButton);

  return li;
};

// Fonction pour supprimer une tâche spécifique
export const deleteChild = (parentNode, targetTask) => {
  parentNode.removeChild(targetTask);
};

// Gère le statut des tâches entre listes
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
