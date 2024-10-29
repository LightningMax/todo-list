const addListModal = (btn) => {
  const addListModal = document.getElementById("add-list-modal");

  btn.addEventListener("click", () => {
    addListModal.showModal();
  });
};

const createList = () => {
  const addListBtn = document.getElementById("add-list-btn");

  addListBtn.onclick = () => {
    const listContainer = document.getElementById("menu-list");
    const inpt = document.getElementById("new-list")
    const li = document.createElement("li");
    const div = document.createElement("div");
    const btn = document.createElement("button");

    btn.textContent = inpt.value || "new list";
    div.appendChild(btn);
    li.appendChild(div);
    listContainer.appendChild(li);
  };
};

/*
  - BUG:
      When the button Add is clicked, it don't shows the modal
      immediately, and when the modal is showed, you need to
      click two times to add a new list.
*/
export const addList = () => {
  const addNewListBtn = document.getElementById("add-new-list");
  const addList = document.getElementById("add-list-btn");

  addNewListBtn.onclick = () => addListModal(addNewListBtn);
  addList.onclick = createList;
};
