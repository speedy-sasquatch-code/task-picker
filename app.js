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
// Set the score to 0 upon start and get the player's score
let score = parseInt(localStorage.getItem("score")) || 0;

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
    delBtn.onclick = ((index) => () => {
      
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
      // Update the score and store it in local storage
      score += 10;
      localStorage.setItem("score", score);
      updateScoreDisplay();
      renderTaskList();
    })(i);

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Update and display the score
function updateScoreDisplay() {
  document.getElementById("scoreDisplay").textContent = score;
  
// Display an message based on the score
const message = document.getElementById("scoreMessage");
  if (score >= 30) {
    message.textContent = "it's a good day";
  } else if (score >= 20) {
    message.textContent = "feed the horse";
  } else if (score >= 10) {
    message.textContent = "open the barn";
  }
  
// Display an image based on the score
  const rewardImg1 = document.getElementById("reward-img1");
  const rewardImg2 = document.getElementById("reward-img2");
  const rewardImg3 = document.getElementById("reward-img3");

// Hide all images first
  rewardImg1.style.display = "none";
  rewardImg2.style.display = "none";
  rewardImg3.style.display = "none";

// Show/hide images based on score
  if (score >= 30) {
    rewardImg3.style.display = "block"; // Score is 30+
  } else if (score >= 20) {
    rewardImg2.style.display = "block"; // Score is 20+
  } else if (score >= 10) {
    rewardImg1.style.display = "block"; // Score is 10+
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
updateScoreDisplay();
document.getElementById("addTaskBtn").addEventListener("click", addTask);
