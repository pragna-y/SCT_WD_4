const tasksContainer = document.getElementById("tasks");
const addTaskButton = document.getElementById("add-task-btn");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");
const dateInput = document.getElementById("task-date");
const categoryInput = document.getElementById("task-category");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.className = `${task.completed ? "completed" : ""}`;
    taskElement.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <p>${task.description || "No description"}</p>
        <p><small>${task.category} | Due: ${task.date || "No date"}</small></p>
      </div>
      <div>
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="complete" onclick="toggleComplete(${index})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    tasksContainer.appendChild(taskElement);
  });
}

function addTask() {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const date = dateInput.value;
  const category = categoryInput.value;

  if (!title) {
    alert("Task title is required!");
    return;
  }

  tasks.push({
    title,
    description,
    date,
    category,
    completed: false,
  });

  saveTasks();
  clearForm();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  titleInput.value = task.title;
  descInput.value = task.description;
  dateInput.value = task.date;
  categoryInput.value = task.category;

  tasks.splice(index, 1); 
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearForm() {
  titleInput.value = "";
  descInput.value = "";
  dateInput.value = "";
  categoryInput.value = "General";
}

addTaskButton.addEventListener("click", addTask);

renderTasks();
