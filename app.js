// --- Load from or initialize task list ---
function loadTasks() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : ["Dishes", "Laundry", "Vacuum"];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let tasks = loadTasks();

// --- Display today's task ---
function getDailyTask(tasks) {
  const today = new Date().toDateString();
  const hash = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return tasks.length ? tasks[hash % tasks.length] : "No tasks left! Take a load off :)";
}

document.getElementById("todayTask").textContent = getDailyTask(tasks);

// --- Display task list and allow editing ---
function renderTaskList() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Done";
    delBtn.onclick = () => {
      tasks.splice(i, 1);
      saveTasks(tasks);
      renderTaskList();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("newTask");
  const newTask = input.value.trim();
  if (newTask) {
    tasks.push(newTask);
    saveTasks(tasks);
    input.value = "";
    renderTaskList();
  }
}

renderTaskList();
