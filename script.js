document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const addListButton = document.getElementById('add-list-button');
    const listMenu = document.getElementById('list-menu');

    let lists = {
        'Main Tasks': []
    };
    let currentList = 'Main Tasks';

    // Function to render tasks of the current list
    function renderTasks() {
        todoList.innerHTML = '';
        if (currentList && lists[currentList]) {
            lists[currentList].forEach(task => addTask(task));
        }
    }

    // Function to add a new task to the list
    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            todoList.removeChild(li);
            lists[currentList] = lists[currentList].filter(task => task !== taskText);
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    // Event listener for form submission to add a new task
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText !== '' && currentList) {
            addTask(taskText);
            lists[currentList].push(taskText);
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
            delete lists[listName];
            if (currentList === listName) {
                currentList = 'Main Tasks';
                renderTasks();
            }
        });

        li.appendChild(deleteBtn);
        listMenu.appendChild(li);

        // Click event to switch lists
        li.addEventListener('click', function() {
            currentList = listName;
            renderTasks();
        });

        // Initialize the tasks array for the new list
        lists[listName] = [];
    }

    // Event listener for adding a new list
    addListButton.addEventListener('click', function() {
        const listName = prompt('Enter the name of the new list:');
        if (listName && !lists[listName]) {
            addList(listName);
        }
    });

    // Initialize with the Main Tasks list
    renderTasks();
});
