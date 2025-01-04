// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') return; // Don't add empty tasks

    const task = {
        id: Date.now(),
        text: taskText
    };

    saveTaskToLocalStorage(task);
    renderTask(task);

    taskInput.value = ''; // Clear input field
}

// Save task to localStorage
function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Render tasks on the page
function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
        ${task.text} <button class="delete-button">Delete</button>
    `;
    taskList.appendChild(li);

    // Attach event listener for delete button
    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteTask(task.id));
}

// Load tasks from localStorage on page load
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => renderTask(task));
}

// Delete task function
function deleteTask(taskId) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Remove task from the UI
    const taskElement = document.querySelector(`li[data-id='${taskId}']`);
    taskElement.remove();
}

// Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);

// Optional: Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
