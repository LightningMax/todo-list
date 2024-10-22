
function addTask() {
    let taskInput = document.getElementById("new-task");
    let taskText = taskInput.value;
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("task-list");

    let li = document.createElement("li");
    li.textContent = taskText;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    
    
    deleteButton.onclick = function () {
        taskList.removeChild(li);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);



    taskInput.value = "";
}  

//