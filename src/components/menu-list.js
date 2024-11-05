export class Lists {
  constructor() {
    this.lists = [];
  }

  initializer() {
    const addListButton = document.getElementById("add-list-button");
    addListButton.onclick = () => {
      this.showModal();
      this.addList();
    };
  }

  createList(title) {
    const list = new List(title);
    this.lists.push(list);
  }

  addList() {
    const confirmAddList = document.getElementById("confirm-add-list");
    const input = document.getElementById("new-list");

    confirmAddList.onclick = () => this.createList(input.value);
    input.value = "";

    console.log(this.lists);
  }

  showModal() {
    const listModal = document.getElementById("list-modal");
    listModal.showModal();
  }
}

class List {
  constructor(title) {
    this.title = title;
    this.body = this.createBody();
  }

  createBody() {
    const menuList = document.getElementById("menu-list");

    const countLists = document.querySelectorAll(".list").length;
    const li = document.createElement("li");
    li.className = "list";
    li.id = `list-${countLists + 1}`;

    const btn = document.createElement("button");
    btn.classList = "list-button";
    const btnCount = document.querySelectorAll(".list-button").length;
    const listTitle = this.title || "New list";
    btn.textContent = listTitle;
    btn.id = `list-button-${btnCount + 1}`;

    li.appendChild(btn);
    menuList.appendChild(li);

    return li;
  }
}
