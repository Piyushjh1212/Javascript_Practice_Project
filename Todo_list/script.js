const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

// 🔄 LocalStorage से पुराने task लाओ
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    tasks = savedTasks;
    tasks.forEach(task => renderTask(task.text, task.completed));
  }
});

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks(); // LocalStorage में सेव करो
  renderTask(task.text, task.completed);
  taskInput.value = "";
}

function renderTask(text, isCompleted) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <button onclick="deleteTask(this)">Delete</button>
  `;

  if (isCompleted) li.classList.add("completed");

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    updateTaskStatus(text);
  });

  taskList.appendChild(li);
}

function deleteTask(btn) {
  const li = btn.parentElement;
  const taskText = li.querySelector("span").innerText;
  tasks = tasks.filter(task => task.text !== taskText);
  saveTasks();
  li.remove();
}

function updateTaskStatus(text) {
  tasks = tasks.map(task =>
    task.text === text ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
