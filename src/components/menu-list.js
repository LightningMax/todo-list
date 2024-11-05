import { createTodoList } from "./task.js";

const addListModal = () => {
  const listModal = document.getElementById("list-modal");
  listModal.showModal();
};

const createList = () => {
  const menuList = document.getElementById("menu-list");
  const input = document.getElementById("new-list");

  const countLists = document.querySelectorAll(".list").length;
  const li = document.createElement("li");
  li.className = "list";
  const listId = (li.id = `list-${countLists + 1}`);

  const btn = document.createElement("button");
  btn.classList = "list-button";
  const btnCount = document.querySelectorAll(".list-button").length;
  const listTitle = (btn.textContent = input.value || "New list");
  btn.id = `list-button-${btnCount + 1}`;

  /**/
  const modifyBtn = document.createElement("button");
  modifyBtn.classList = "modify-button";
  modifyBtn.textContent = "Modify";
  modifyBtn.id = `modify-button-${btnCount + 1}`;

  li.appendChild(btn);
  li.appendChild(modifyBtn); /**/
  menuList.appendChild(li);

  input.value = "";

  createTodoList(listId, listTitle);
};

export const addList = () => {
  const addListButton = document.getElementById("add-list-button");
  const confirmAddList = document.getElementById("confirm-add-list");

  addListButton.onclick = addListModal;
  confirmAddList.onclick = createList;
};

export const createDefautTodo = () => {
  createList();
};

const hideList = () => {
  lists = document.querySelectorAll(".list");
};
