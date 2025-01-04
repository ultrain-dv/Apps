// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const listSelector = document.getElementById('listSelector');
const createNewListButton = document.getElementById('createNewListButton');

// Load task lists from localStorage
document.addEventListener('DOMContentLoaded', loadTaskLists);

// Create a new task list
function createNewList() {
    const listName = prompt("Enter the name for the new list:");

    if (listName && listName.trim()) {
        const taskLists = getTaskListsFromLocalStorage();

        // Check if the list already exists
        if (taskLists.some(list => list.name === listName.trim())) {
            alert("A list with this name already exists.");
            return;
        }

        taskLists.push({ name: listName.trim(), tasks: [] });
        localStorage.setItem('taskLists', JSON.stringify(taskLists));

        // Reload the list selector with the new list
        loadTaskLists();
    } else {
        alert("Please enter a valid name for the list.");
    }
}

// Get all task lists from localStorage
function getTaskListsFromLocalStorage() {
    const taskLists = localStorage.getItem('taskLists');
    return taskLists ? JSON.parse(taskLists) : [];
}

// Load task lists into the selector
function loadTaskLists() {
    const taskLists = getTaskListsFromLocalStorage();

    // Clear the current options
    listSelector.innerHTML = '<option value="">-- Select a List --</option>';

    taskLists.forEach((list, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = list.name;
        listSelector.appendChild(option);
    });

    // Set event listener to load tasks when a list is selected
    listSelector.addEventListener('change', loadTasks);
}

// Load tasks for the selected list
function loadTasks() {
    const taskLists = getTaskListsFromLocalStorage();
    const selectedListIndex = listSelector.value;

    if (selectedListIndex === "") return; // No list selected

    const tasks = taskLists[selectedListIndex].tasks;
    taskList.innerHTML = ''; // Clear current task list

    tasks.forEach(task => renderTask(task));
}

// Add task to the selected list
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '' || listSelector.value === '') return; // Don't add empty tasks or without a list selected

    const taskLists = getTaskListsFromLocalStorage();
    const selectedListIndex = listSelector.value;
    const task = { id: Date.now(), text: taskText };

    taskLists[selectedListIndex].tasks.push(task);
    localStorage.setItem('taskLists', JSON.stringify(taskLists));

    renderTask(task); // Render the task in the UI
    taskInput.value = ''; // Clear input field
}

// Render task on the page
function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `${task.text} <button class="delete-button">Delete</button>`;
    taskList.appendChild(li);

    // Attach event listener for delete button
    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteTask(task.id));
}

// Delete task from the selected list
function deleteTask(taskId) {
    const taskLists = getTaskListsFromLocalStorage();
    const selectedListIndex = listSelector.value;
    const updatedTasks = taskLists[selectedListIndex].tasks.filter(task => task.id !== taskId);

    taskLists[selectedListIndex].tasks = updatedTasks;
    localStorage.setItem('taskLists', JSON.stringify(taskLists));

    // Remove task from the UI
    const taskElement = document.querySelector(`li[data-id='${taskId}']`);
    taskElement.remove();
}

// Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);

// Event listener for creating a new list
createNewListButton.addEventListener('click', createNewList);
