const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const countSpan = document.getElementById("count");

let tasks = [];

// Load tasks from local storage if available
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
}

function updatePendingCount() {
    const pendingTasks = tasks.filter(task => !task.completed);
    countSpan.textContent = pendingTasks.length;
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" ${task.completed ? "checked" : ""}>
                        <span class="${task.completed ? "complete" : ""}">${task.name}</span>
                        <button class="delete" data-index="${index}">Delete</button>`;
        taskList.appendChild(li);
    });
    updatePendingCount();

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
addTaskBtn.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
        tasks.push({ name: taskName, completed: false });
        renderTasks();
        taskInput.value = "";
    }
});

taskList.addEventListener("change", (event) => {
    if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
        const index = event.target.parentElement.querySelector(".delete").getAttribute("data-index");
        tasks[index].completed = event.target.checked;
        renderTasks();
    }
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const index = event.target.getAttribute("data-index");
        tasks.splice(index, 1);
        renderTasks();
    }
});

renderTasks();
