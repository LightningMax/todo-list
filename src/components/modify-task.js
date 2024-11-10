export class ModifyTask {
  constructor(listId, title, modifyCallback) {
    this.listId = listId;
    this.title = title;
    this.modifyCallback = modifyCallback;
    this.element = this.createModifyButton();
  }

  createModifyButton() {
    const button = document.createElement("button");
    button.textContent = "Modify";
    button.onclick = () => this.modifyCallback(this.listId, this.title);
    return button;
  }
}
