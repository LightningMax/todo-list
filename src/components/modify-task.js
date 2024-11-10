/* 
    TODO:
      Refact: use onclick instead of addEventListener when
      working with buttons.
      Ex: showAllTasksButton.onclick = ...

      Refact: use textContent insteado of innerHTML when
      adding text to a element

      Refact: The showAllTasks in fact should show only the tasks
      from one list.

*/

export const addModifyButton = (taskElement, listContentId) => {
  const modifyButton = document.createElement("button");
  modifyButton.classList.add("modify-task");
  modifyButton.textContent = "Modify";
  modifyButton.onclick = () => showModifyForm(taskElement, listContentId);

  taskElement.appendChild(modifyButton);
};

const showModifyForm = (taskElement, listContentId) => {
  const taskText = taskElement.querySelector(".task-text").textContent;
  const taskDate = taskElement.querySelector(".task-date").textContent;

  const form = document.createElement("form");
  form.classList.add("modify-form");

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.value = taskText;
  inputText.classList.add("modify-task-name");

  const inputDate = document.createElement("input");
  inputDate.type = "date";
  inputDate.value = taskDate;
  inputDate.classList.add("modify-task-date");

  const btnSave = document.createElement("button");
  btnSave.type = "submit";
  btnSave.textContent = "Save";
  btnSave.onclick = (event) => {
    event.preventDefault();
    modifyTask(taskElement, inputText.value, inputDate.value, listContentId);
    form.remove();
  };

  form.append(inputText, inputDate, btnSave);
  taskElement.appendChild(form);
};

const modifyTask = (taskElement, newText, newDate, listContentId) => {
  const taskTextElement = taskElement.querySelector(".task-text");
  const taskDateElement = taskElement.querySelector(".task-date");

  taskTextElement.textContent = newText;
  taskDateElement.textContent = newDate;
};
