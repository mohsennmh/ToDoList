document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filterBtn');
    
    // Load tasks from localStorage
    loadTasks();

    addBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteBtn')) {
            e.target.parentElement.parentElement.remove();
            saveTasks();
        } else if (e.target.classList.contains('completeBtn')) {
            e.target.parentElement.parentElement.classList.toggle('completed');
            saveTasks();
        } else if (e.target.classList.contains('editBtn')) {
            const li = e.target.parentElement.parentElement;
            const taskText = li.querySelector('.task-text');
            const newTaskText = prompt('Edit task:', taskText.textContent);
            if (newTaskText !== null) {
                taskText.textContent = newTaskText.trim();
                saveTasks();
            }
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            const tasks = document.querySelectorAll('#taskList li');

            tasks.forEach(task => {
                switch (filter) {
                    case 'all':
                        task.style.display = 'flex';
                        break;
                    case 'active':
                        task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                        break;
                    case 'completed':
                        task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                        break;
                }
            });
        });
    });

    function addTask(text) {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <span class="task-text">${text}</span>
            <div class="task-buttons">
                <button class="completeBtn">Complete</button>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task').forEach(task => {
            tasks.push({
                text: task.querySelector('.task-text').textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskFromStorage(task));
    }

    function addTaskFromStorage(task) {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-buttons">
                <button class="completeBtn">Complete</button>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    }
});
