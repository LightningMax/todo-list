export const addModifyButton = (taskElement, listContentId) => {
  const modifyButton = document.createElement("button");
  modifyButton.classList.add("modify-task");
  modifyButton.textContent = "Modify";
  modifyButton.onclick = () => showModifyForm(taskElement, listContentId);

  taskElement.appendChild(modifyButton);
};

const showModifyForm = (taskElement, listContentId) => {
  console.log("showModifyForm called");
};
