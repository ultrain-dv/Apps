document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const addListButton = document.getElementById('add-list-button');
    const listMenu = document.getElementById('list-menu');

    let lists = JSON.parse(getCookie('lists')) || { 'Main Tasks': [] };
    let currentList = getCookie('currentList') || 'Main Tasks';

    // Function to set a cookie
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

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
            setCookie('lists', lists, 30);
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
            setCookie('lists', lists, 30);
            todoInput.value = ''; // Clear the input field
        }
    });

    // Function to add a new list to the sidebar
    function addList(listName) {
        const li = document.createElement('li');
        li.textContent = listName;

        if (listName !== 'Main Tasks') {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                listMenu.removeChild(li);
                delete lists[listName];
                setCookie('lists', lists, 30);
                if (currentList === listName) {
                    currentList = 'Main Tasks';
                    setCookie('currentList', currentList, 30);
                    renderTasks();
                }
            });
            li.appendChild(deleteBtn);
        }

        listMenu.appendChild(li);

        // Click event to switch lists
        li.addEventListener('click', function() {
            currentList = listName;
            setCookie('currentList', currentList, 30);
            renderTasks();
        });

        // Initialize the tasks array for the new list
        if (!lists[listName]) {
            lists[listName] = [];
            setCookie('lists', lists, 30);
        }
    }

    // Event listener for adding a new list
    addListButton.addEventListener('click', function() {
        const listName = prompt('Enter the name of the new list:');
        if (listName && !lists[listName]) {
            addList(listName);
        }
    });

    // Initialize with the Main Tasks list
    Object.keys(lists).forEach(listName => addList(listName));
    renderTasks();
});
