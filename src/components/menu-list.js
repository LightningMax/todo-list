import { createStructureTask } from "./task.js";

const addListModal = () => {
  const listModal = document.getElementById("list-modal");
  listModal.showModal();
};

const createList = () => {
  const menuList = document.getElementById("menu-list");
  const input = document.getElementById("new-list");
  const li = document.createElement("li");
  const btn = document.createElement("button");

  btn.textContent = input.value || "new list";
  btn.id = "list-button";
  li.appendChild(btn);
  menuList.appendChild(li);

  input.value = "";

  createStructureTask()
};

export const addList = () => {
  const addListButton = document.getElementById("add-list-button");
  const confirmAddList = document.getElementById("confirm-add-list");

  addListButton.onclick = addListModal;
  confirmAddList.onclick = createList;
};

export const createDefautTodo = () => {
  createList()
}
