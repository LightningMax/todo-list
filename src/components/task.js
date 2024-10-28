export const isFieldValid = (field) => {
  if (field.trim() === "") {
    alert("You need to fill in the field");
    return true;
  }
  return false;
};

export function addTask() {
  let taskInputText = document.getElementById("name-task");
  let taskText = taskInputText.value;

  let taskInputDate = document.getElementById("date-task");
  let taskDate = taskInputDate.value;

  let taskList = document.getElementById("task-list");

  let li = document.createElement("li");
  li.id = "task";
  taskDate = taskDate.split("-").reverse().join("-");
  li.textContent = taskText + "   " + taskDate;

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.display = "none";
  li.appendChild(deleteButton);

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  let finishList = document.getElementById("finish-task");
  checkBox.onchange = function () {
    if (checkBox.checked) {
      deleteButton.style.display = "inline";
      finishTask(taskList, finishList, li);
    } else {
      deleteButton.style.display = "none";
      returnTask(taskList, finishList, li); // Appeler returnTask si décochée
    }
  };

  deleteButton.onclick = function () {
    deleteTask(finishList, li);
  };

  li.appendChild(checkBox);
  taskList.appendChild(li);

  taskInputText.value = "";
  taskInputDate.value = "";
}

export const deleteTask = (finishList, li) => {
  finishList.removeChild(li);
};

export function finishTask(taskList, finishList, li) {
  finishList.appendChild(li);
  taskList.removeChild(li);
}

export function returnTask(taskList, finishList, li) {
  taskList.appendChild(li);
  finishList.removeChild(li);
}
