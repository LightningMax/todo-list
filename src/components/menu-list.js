const addListModal = () => {
  const listModal = document.getElementById("list-modal");
  listModal.showModal();
};

const createList = () => {
  const listContainer = document.getElementById("menu-list");
  const input = document.getElementById("new-list");
  const li = document.createElement("li");
  const div = document.createElement("div");
  const btn = document.createElement("button");

  btn.textContent = input.value || "new list";
  div.appendChild(btn);
  li.appendChild(div);
  listContainer.appendChild(li);

  input.value = ""
};

export const addList = () => {
  const addListButton = document.getElementById("add-list-button");
  const confirmAddList = document.getElementById("confirm-add-list");

  addListButton.onclick = addListModal;
  confirmAddList.onclick = createList;
};
