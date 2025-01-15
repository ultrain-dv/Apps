document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const addListButton = document.getElementById('add-list-button');
    const listMenu = document.getElementById('list-menu');

    // Function to add a new task to the list
    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            todoList.removeChild(li);
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    // Event listener for form submission to add a new task
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            todoInput.value = ''; // Clear the input field
        }
    });

    // Function to add a new list to the sidebar
    function addList(listName) {
        const li = document.createElement('li');
        li.textContent = listName;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            listMenu.removeChild(li);
        });

        li.appendChild(deleteBtn);
        listMenu.appendChild(li);

        // Optional: Add click event to switch lists (not implemented yet)
        li.addEventListener('click', function() {
            // Logic to switch lists can be added here
            alert(`Switched to list: ${listName}`);
        });
    }

    // Event listener for adding a new list
    addListButton.addEventListener('click', function() {
        const listName = prompt('Enter the name of the new list:');
        if (listName) {
            addList(listName);
        }
    });
});

