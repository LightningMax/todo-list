export const isFieldValid = (field, message) => {
  if (field.trim() === "") {
    alert(message);
    return false;
  }
  return true;
};

export const createTodoList = (listId, listTitle) => {
  const div = document.createElement("div");
  div.classList.add("todo-container");
  div.id = `${listId}-content`;

  const titleList = document.createElement("h2");
  titleList.textContent = listTitle;

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.classList.add("task-name");
  inputText.placeholder = "Add a new task";

  const inputDate = document.createElement("input");
  inputDate.type = "date";
  inputDate.classList.add("task-date");

  const btnAddTask = document.createElement("button");
  btnAddTask.classList.add("add-task-button");
  btnAddTask.textContent = "Add Task";
  btnAddTask.onclick = () => addTask(div.id);

  const listTask = document.createElement("ul");
  listTask.classList.add("task-list");

  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Task Finished";

  const finishedTasks = document.createElement("ul");
  finishedTasks.classList.add("finished-tasks");

  div.append(titleList, inputText, inputDate, btnAddTask, listTask, fieldset);
  fieldset.append(legend, finishedTasks);
  document.body.appendChild(div);
};

const createTask = (taskText, taskDate, listContentId) => {
  const countTask = document.querySelectorAll(`#${listContentId} .task`).length;
  const li = document.createElement("li");
  li.className = "task";
  li.id = `task-${countTask + 1}`;
  li.textContent = `${taskText} ${taskDate.split("-").reverse().join("/")}`;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-task");
  deleteButton.textContent = "Delete";
  deleteButton.style.display = "none";
  deleteButton.onclick = () =>
    deleteChild(
      document.querySelector(`#${listContentId} .finished-tasks`),
      li
    );

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onchange = () =>
    taskStatus(li, deleteButton, checkBox, listContentId);

  li.append(checkBox, deleteButton);

  return li;
};

export const deleteChild = (parentNode, targetTask) => {
  parentNode.removeChild(targetTask);
};

const taskStatus = (li, deleteButton, checkBox, listContentId) => {
  const taskList = document.querySelector(`#${listContentId} .task-list`);
  const finishList = document.querySelector(
    `#${listContentId} .finished-tasks`
  );

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
  const taskInputDate = document.querySelector(`#${listContentId} .task-date`);

  if (
    isFieldValid(taskInputText.value, "You need to fill in the field") &&
    isFieldValid(taskInputDate.value, "You need to pick a date")
  ) {
    const newTask = createTask(
      taskInputText.value,
      taskInputDate.value,
      listContentId
    );
    const taskList = document.querySelector(`#${listContentId} .task-list`);
    taskList.appendChild(newTask);

    taskInputText.value = "";
    taskInputDate.value = "";
  }
};
