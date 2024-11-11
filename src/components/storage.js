import { Tasks } from "./task.js";
import { todoLists, TodoList } from "./todo-list.js";
import  lists  from "./menu-list.js";

const exportDataAsCSV = () => {
  // Prepare CSV rows with headers
  const rows = [
    ["List ID", "List Title", "Task Name", "Task Date", "Completed"],
  ];

  // Loop through each list and collect data
  document.querySelectorAll(".list").forEach((listElement) => {
    const listId = listElement.id;
    const listTitle = listElement.querySelector(".list-button").textContent;
    const taskElements = document.querySelectorAll(`#${listId}-content .task`);

    // Loop through each task and extract relevant data
    taskElements.forEach((taskElement) => {
      const taskName = taskElement.querySelector(".info-task span").textContent;
      const taskDate =
        taskElement.querySelector(".task-date")?.textContent || "";
      const isCompleted = taskElement.classList.contains("completed")
        ? "Yes"
        : "No";

      rows.push([listId, listTitle, taskName, taskDate, isCompleted]);
    });
  });

  // Convert data to CSV format
  const csvContent = rows.map((e) => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  // Create a temporary link to trigger download
  const link = document.createElement("a");
  link.href = url;
  link.download = "todoData.csv";
  link.click();

  // Release the object URL
  URL.revokeObjectURL(url);
};

const importDataFromCSV = (file) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const csvData = event.target.result;
    const rows = csvData.split("\n").map((row) => row.split(","));

    // Clear existing lists and tasks from the UI
    document
      .querySelectorAll(".list")
      .forEach((listElement) => listElement.remove());
    document
      .querySelectorAll(".todo-container")
      .forEach((container) => container.remove());

    // Initialize class instances for managing lists and tasks

    // Process each row from the CSV, skipping the header
    rows
      .slice(1)
      .forEach(([listId, listTitle, taskName, taskDate, completed]) => {
        // Check if the list already exists
        let currentList = lists.lists.find((list) => list.id === listId);

        // Create the list if it doesn't already exist
        if (!currentList) {
          lists.createList(listTitle);
          currentList = lists.lists.find((list) => list.title === listTitle);
        }

        // Retrieve or create the task instance for the current list
        const todoList = todoLists.todoLists.find(
          (todo) => todo.listId === currentList.id
        );
        if (todoList) {
          todoList.tasks.addTask(taskName, taskDate, completed === "Yes", true); // Pass true to skip validation
        }
      });
  };

  reader.readAsText(file);
};

const createButtons = () => {
  const sidebar = document.getElementById("sidebar");

  // Create and append CSV download button
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Télécharger CSV";
  downloadButton.onclick = exportDataAsCSV;
  sidebar.appendChild(downloadButton);

  // Create and append CSV import button
  const importButton = document.createElement("button");
  importButton.textContent = "Importer fichier CSV";
  importButton.onclick = () => document.getElementById("import-file").click();
  sidebar.appendChild(importButton);

  // Create hidden file input for CSV file upload
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

export default createButtons;
