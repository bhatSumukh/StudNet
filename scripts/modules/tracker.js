// DOM Elements
const taskInput = document.getElementById("task-input");
const taskList = document.querySelector(".task-list");
const addTaskBtn = document.getElementById("add-task");

const alertMsg = document.querySelector(".alert-container");
const overlayDiv = document.querySelector(".overlay");
const alertSound = document.getElementById("alert-audio");

// Load tasks from Local Storage or set empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load saved tasks on page load
tasks.forEach((task) => {
  createTask(task.text, task.completed);
});
updateProgress();

// Add new task
function addTask() {
  const inputText = taskInput.value.trim();

  if (inputText !== "") {
    const task = {
      text: inputText,
      completed: false,
    };

    tasks.push(task);
    saveTasks();
    createTask(task.text, task.completed);

    taskInput.value = "";
  }
  if (inputText === "") {
    alertMsg.style.display = "flex";
    overlayDiv.style.display = "block";
    alertSound.currentTime = 0;
    alertSound.play();
    return;
  }
  updateProgress();
}

// Create task UI
function createTask(text, completed) {
  const newList = document.createElement("li");

  const checkCompleteBtn = document.createElement("input");
  checkCompleteBtn.type = "checkbox";
  checkCompleteBtn.classList.add("complete-task-checkbox");
  checkCompleteBtn.checked = completed;

  const taskText = document.createElement("span");
  taskText.textContent = text;
  taskText.classList.add("task-content");

  if (completed) {
    taskText.style.textDecoration = "line-through";
  }

  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.classList.add("dlt-task-btn");
  deleteTaskBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  newList.appendChild(checkCompleteBtn);
  newList.appendChild(taskText);
  newList.appendChild(deleteTaskBtn);

  taskList.appendChild(newList);

  // Toggle complete
  checkCompleteBtn.addEventListener("change", () => {
    taskText.style.textDecoration = checkCompleteBtn.checked
      ? "line-through"
      : "none";

    updateTask(text, checkCompleteBtn.checked);
    updateProgress();
  });

  // Delete task
  deleteTaskBtn.addEventListener("click", () => {
    newList.remove();
    deleteTask(text);
    updateProgress();
  });
}

// Save to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task completed status
function updateTask(text, completed) {
  tasks = tasks.map((task) =>
    task.text === text ? { ...task, completed } : task
  );
  saveTasks();
}

// Delete task
function deleteTask(text) {
  tasks = tasks.filter((task) => task.text !== text);
  saveTasks();
}

// Close alert
function alertClick() {
  alertMsg.style.display = "none";
  overlayDiv.style.display = "none";
}

function updateProgress() {
  const tasks = document.querySelectorAll(".task-list li");
  const completedTasks = document.querySelectorAll(
    ".task-list li input[type='checkbox']:checked"
  );

  const total = tasks.length;
  const completed = completedTasks.length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("progress-fill").style.width = percentage + "%";
  document.getElementById("progress-text").innerText =
    percentage + "% completed";
}
