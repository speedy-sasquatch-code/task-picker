// Initialise jsConfetti for Done button
const jsConfetti = window.JSConfetti ?
new JSConfetti() : null;

// Load from or initialize task list
function loadTasks() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : ["Dishes", "Laundry", "Vacuum"];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let tasks = loadTasks();
let score = 0;

// Display today's task
function getDailyTask(tasks) {
  const today = new Date().toDateString();
  const hash = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return tasks.length ? tasks[hash % tasks.length] : "No tasks left! Take a load off :)";
}

document.getElementById("todayTask").textContent = getDailyTask(tasks);

// Display task list and allow completion
function renderTaskList() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Done";
    delBtn.onclick = () => {
      // jsConfetti using emojis
      if (jsConfetti) {
       jsConfetti.addConfetti({
         emojis: ['🎉', '✨', '💫', '🎊'],
         emojiSize: 50,
         confettiNumber: 30
      });
      }
      tasks.splice(i, 1);
      saveTasks(tasks);
      score += 10;
      updateScoreDisplay();
      renderTaskList();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Display an image based on the score
function updateScoreDisplay() {
  const rewardImg = document.getElementById("reward-img");

  if (score > 10) {
    rewardImg.style.display = "block";
  } else {
    rewardImg.style.display = "none";
  }
}

// Add a new task to the list
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

// Ensure the task list is rendered
renderTaskList();
