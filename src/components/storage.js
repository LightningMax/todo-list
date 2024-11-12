import { Tasks } from "./task.js";
import { todoLists, TodoList } from "./todo-list.js";
import lists from "./menu-list.js";

const exportDataAsCSV = () => {
  const rows = [
    ["List ID", "List Title", "Task Name", "Task Date", "Completed"],
  ];

  document.querySelectorAll(".list").forEach((listElement) => {
    const listId = listElement.id;
    const listTitle = listElement.querySelector(".list-button").textContent;
    const taskElements = document.querySelectorAll(`#${listId}-content .task`);

    taskElements.forEach((taskElement) => {
      const elements = taskElement.querySelectorAll("span");
      const taskName = elements[0].textContent;
      const taskDateElement = elements[1].textContent;
      const taskDate = taskDateElement;
      const isCompleted = taskElement.querySelector("input[type='checkbox']")
        .checked
        ? "Yes"
        : "No";

      rows.push([listId, listTitle, taskName, taskDate, isCompleted]);
    });
  });

  const csvContent = rows.map((e) => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "todoData.csv";
  link.click();

  URL.revokeObjectURL(url);
};

const importDataFromCSV = (file) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const csvData = event.target.result;
    const rows = csvData.split("\n").map((row) => row.split(","));

    document
      .querySelectorAll(".list")
      .forEach((listElement) => listElement.remove());
    document
      .querySelectorAll(".todo-container")
      .forEach((container) => container.remove());

    rows
      .slice(1)
      .forEach(([listId, listTitle, taskName, taskDate, completed]) => {
        let currentList = lists.lists.find((list) => list.id === listId);

        if (!currentList) {
          lists.createList(listTitle);
          currentList = lists.lists.find((list) => list.title === listTitle);
        }
        const todoList = todoLists.todoLists.find(
          (todo) => todo.listId === currentList.id
        );
        if (todoList) {
          todoList.tasks.addTask(taskName, taskDate, completed === "Yes", true);
        }
      });
  };

  reader.readAsText(file);
};



const importExport = () => {
  const downloadButton = document.getElementById("download-button");
  const importButton = document.getElementById("import-button");
  const importFileInput = document.getElementById("import-file");
  
  downloadButton.addEventListener("click", exportDataAsCSV);
  
  importButton.addEventListener("click", () => {
    importFileInput.click();
  });
  
  importFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) importDataFromCSV(file);
  });
}

export default importExport