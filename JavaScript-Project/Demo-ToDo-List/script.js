window.onload = function() {
  displayTasks();
};

function getTasks() {
  let tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  let dueDate = document.getElementById("dueDate").value;
  let priority = document.getElementById("priority").value;
  
  let task = input.value.trim();
  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  let tasks = getTasks();
  tasks.push({
    text: task,
    completed: false,
    dueDate: dueDate || "No date",
    priority: priority
  });

  saveTasks(tasks);
  input.value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("priority").value = "Medium";
  displayTasks();
}

function toggleTask(index) {
  let tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  displayTasks();
}

function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  displayTasks();
}

function sortTasks(tasks) {
  const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
  return tasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed - b.completed; // completed goes last
    }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
}

function displayTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let tasks = getTasks();
  tasks = sortTasks(tasks);

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.classList.add(task.priority.toLowerCase());

    li.innerHTML = 
      <><div class="task-top">
            <span>${task.text}</span>
            <small>📅 ${task.dueDate}</small>
        </div><div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div></>
    ;

    taskList.appendChild(li);
  });
}