import { Tasks } from "./task.js";
import { TodoLists } from "./todo-list.js";

const saveData = () => {
  const lists = [];
  document.querySelectorAll(".list").forEach((listElement) => {
    const listId = listElement.id;
    const listTitle = listElement.querySelector(".list-button").textContent;
    const tasks = [];

    const taskElements = document.querySelectorAll(`#${listId}-content .task`);
    taskElements.forEach((taskElement) => {
      const taskName = taskElement.querySelector(".info-task span").textContent;
      const taskDate = taskElement.querySelector(".task-date")?.textContent;
      const isCompleted = taskElement.classList.contains("completed");

      tasks.push({ name: taskName, date: taskDate, completed: isCompleted });
    });

    lists.push({ id: listId, title: listTitle, tasks });
  });

  localStorage.setItem("todoData", JSON.stringify(lists));
};

const loadData = () => {
  const storedData = JSON.parse(localStorage.getItem("todoData"));

  if (storedData) {
    storedData.forEach((list) => {
      createTodoList(list.id, list.title);
      const tasksInstance = new Tasks(list.id);

      list.tasks.forEach((task) => {
        tasksInstance.tasks.push(task); // Ajoute chaque tâche à l'instance
        tasksInstance.addTask(); // Utilise addTask pour afficher la tâche
      });
    });
  }
};

const exportData = () => {
  const data = localStorage.getItem("todoData");
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "todoData.json";
  link.click();

  URL.revokeObjectURL(url);
};

const importData = (file) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const importedData = JSON.parse(event.target.result);
    localStorage.setItem("todoData", JSON.stringify(importedData));
    location.reload();
  };

  reader.readAsText(file);
};

const createButtons = () => {
  const sidebar = document.getElementById("sidebar");

  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Télécharger";
  downloadButton.onclick = exportData;
  sidebar.appendChild(downloadButton);

  const importButton = document.createElement("button");
  importButton.textContent = "Importer fichier";
  importButton.onclick = () => document.getElementById("import-file").click();
  sidebar.appendChild(importButton);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "import-file";
  fileInput.style.display = "none";
  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) importData(file);
  };
  sidebar.appendChild(fileInput);
};

export { saveData, loadData, exportData, importData, createButtons };
