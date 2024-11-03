export const showAllTasks = () => {
  const showAllTasksButton = document.getElementById("show-all-tasks-button");
  const allTasksPage = document.getElementById("all-tasks-page");
  const allTasksList = document.getElementById("all-tasks-list");
  const saveTasksButton = document.getElementById("save-tasks-button");

  showAllTasksButton.addEventListener("click", () => {
    allTasksList.innerHTML = ""; // Clear the list before adding tasks
    const taskLists = document.querySelectorAll(".task-list");
    taskLists.forEach((taskList) => {
      taskList.querySelectorAll(".task").forEach((task) => {
        const newTask = task.cloneNode(true);
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          const taskText = prompt("Edit task:", task.textContent);
          if (taskText) {
            task.textContent = taskText;
          }
        });
        newTask.appendChild(editButton);
        allTasksList.appendChild(newTask);
      });
    });
    allTasksPage.classList.remove("hidden");
  });

  saveTasksButton.addEventListener("click", () => {
    allTasksPage.classList.add("hidden");
  });
};
