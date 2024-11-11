import { TodoLists, TodoList } from "./todo-list.js";
import { Lists } from "./menu-list.js";

const exportDataAsCSV = () => {
  const rows = [["List ID", "List Title", "Task Name", "Task Date", "Completed"]];

  document.querySelectorAll(".list").forEach((listElement) => {
    const listId = listElement.id;
    const listTitle = listElement.querySelector(".list-button").textContent;
    const taskElements = document.querySelectorAll(`#${listId}-content .task`);

    taskElements.forEach((taskElement) => {
      const taskName = taskElement.querySelector(".info-task span").textContent;
      const taskDateElement = taskElement.querySelector(".task-date");
      const taskDate = taskDateElement ? taskDateElement.getAttribute("data-date") : ""; // Retrieve date attribute
      const isCompleted = taskElement.querySelector("input[type='checkbox']").checked ? "Yes" : "No";

      rows.push([listId, listTitle, taskName, taskDate, isCompleted]);
    });
  });

  const csvContent = rows.map(e => e.join(",")).join("\n");
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
    const rows = csvData.split("\n").map(row => row.split(","));

    document.querySelectorAll(".list").forEach(listElement => listElement.remove());
    document.querySelectorAll(".todo-container").forEach(container => container.remove());

    const todoListsInstance = new TodoLists();
    const listsInstance = new Lists(todoListsInstance);

    rows.slice(1).forEach(([listId, listTitle, taskName, taskDate, completed]) => {
      let currentList = listsInstance.lists.find(list => list.id === listId);

      if (!currentList) {
        listsInstance.createList(listTitle);
        currentList = listsInstance.lists.find(list => list.title === listTitle);
      }

      const todoList = todoListsInstance.todoLists.find(todo => todo.listId === currentList.id);
      if (todoList) {
        todoList.tasks.addTask(taskName, taskDate, completed === "Yes", true);
      }
    });
  };

  reader.readAsText(file);
};

const createButtons = () => {
  const sidebar = document.getElementById("sidebar");

  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Télécharger CSV";
  downloadButton.onclick = exportDataAsCSV;
  sidebar.appendChild(downloadButton);

  const importButton = document.createElement("button");
  importButton.textContent = "Importer fichier CSV";
  importButton.onclick = () => document.getElementById("import-file").click();
  sidebar.appendChild(importButton);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "import-file";
  fileInput.style.display = "none";
  fileInput.accept = ".csv";
  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) importDataFromCSV(file);
  };
  sidebar.appendChild(fileInput);
};

export { exportDataAsCSV, importDataFromCSV, createButtons };
