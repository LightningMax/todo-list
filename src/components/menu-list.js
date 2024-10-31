import { createStructureTask } from "./task.js";

const addListModal = () => {
  const listModal = document.getElementById("list-modal");
  listModal.showModal();
};

const createList = () => {
  const menuList = document.getElementById("menu-list");
  const input = document.getElementById("new-list");
  
  const countLists = document.querySelectorAll(".list").length
  const li = document.createElement("li");
  li.className = "list"  
  li.id = `list-${countLists+1}`
  
  const btn = document.createElement("button");
  btn.classList = "list-button"
  const btnCount = document.querySelectorAll(".list-button").length
  btn.textContent = input.value || "new list";
  btn.id = `list-button-${btnCount+1}`;
  
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

const hideList = () => {
  lists = document.querySelectorAll(".list")

  
}