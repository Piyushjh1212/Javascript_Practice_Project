const TaskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", addTask);

function addTask(){
     const taskText = TaskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
    const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button onclick="deleteTask(this)">Delete</button>
  `;

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  taskList.appendChild(li);
  TaskInput.value = "";
}

function deleteTask(btn) {
  btn.parentElement.remove();
}
