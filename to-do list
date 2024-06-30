document.addEventListener('DOMContentLoaded', loadTasks);
document.querySelector('#task-form').addEventListener('submit', addTask);
document.querySelector('#task-list').addEventListener('click', manageTask);

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToList(task));
}

function addTask(e) {
    e.preventDefault();
    const taskInput = document.querySelector('#task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please add a task');
        return;
    }

    addTaskToList(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = '';
}

function addTaskToList(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;
    document.querySelector('#task-list').appendChild(li);
}

function manageTask(e) {
    if (e.target.classList.contains('delete')) {
        deleteTask(e.target.parentElement);
    } else if (e.target.classList.contains('edit')) {
        editTask(e.target.parentElement);
    }
}

function deleteTask(taskElement) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskElement.remove();
        removeTaskFromLocalStorage(taskElement);
    }
}

function editTask(taskElement) {
    const newTaskText = prompt('Edit your task:', taskElement.firstElementChild.textContent);
    if (newTaskText) {
        taskElement.firstElementChild.textContent = newTaskText;
        updateTaskInLocalStorage(taskElement, newTaskText);
    }
}

function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskElement) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskElement.firstElementChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskElement, newTaskText) {
    let tasks = getTasksFromLocalStorage();
    const oldTaskText = taskElement.firstElementChild.textContent;
    const taskIndex = tasks.indexOf(oldTaskText);
    tasks[taskIndex] = newTaskText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
