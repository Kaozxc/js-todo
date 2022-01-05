let createTodo = (id, title, description, dueDate, priority, projectName) => {
    return {
        id: id,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        projectName: projectName
    }
}

let projectList = ['default'];
let toDoList = [{
    id: uuidv4(),
    title: 'Run',
    description: 'have to run',
    dueDate: '44565734',
    priority: 'Small',
    projectName: 'default'
}];

const PROJECT_LIST_KEY = 'projectList';
const TODO_LIST_KEY = 'todoList';

projectList = JSON.parse(localStorage.getItem(PROJECT_LIST_KEY)) ?? ['default'];
toDoList = JSON.parse(localStorage.getItem(TODO_LIST_KEY)) ?? [{id: uuidv4(),
    title: 'Run',
    description: 'have to run',
    dueDate: '44565734',
    priority: 'Small',
    projectName: 'default'}];

const domList = document.getElementById('list');

const submitProjectBtn = document.getElementById('submitProject');
const projectNameVar = document.getElementById('project');
const submitBtn = document.getElementById('submit');
const removeBtn = document.getElementById('remove');
let inputTitle = document.getElementById('title');
let inputDescription = document.getElementById('description');
let inputDueDate = document.getElementById('dueDate');
let inputPriority = document.getElementById('prioritySelect');
let inputProjectName = document.getElementById('projectNameSelect');

let inputID = document.getElementById('id');

submitBtn.addEventListener('click', () => {
    if (!inputTitle.value || !inputDescription.value || !inputDueDate.value || !inputPriority.value || !inputProjectName.value) {
        alert('provide all values');
        return;
    }
    if (inputID.value.length > 0) {
        editToDo(inputID.value);
    } else {
        toDoList.push(createTodo(uuidv4(), inputTitle.value, inputDescription.value, inputDueDate.value, inputPriority.value, inputProjectName.value));
    }
    refresh();
    saveDataInLocalStorage();
})

function editToDo(id) {
    let todo = toDoList.filter(todo => todo.id === id)[0];
    todo.title = inputTitle.value;
    todo.description = inputDescription.value;
    todo.dueDate = inputDueDate.value;
    todo.priority = inputPriority.value;
    todo.projectName = inputProjectName.value;
    inputID.value = '';
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}

submitProjectBtn.addEventListener('click', () => {
    projectList.push(projectNameVar.value);
    refresh();
})

function refresh() {
    showProjectList();
    renderprojectSelect();
    generateList();
}

function showProjectList() {
    document.querySelector('#projectList').textContent = `List of Projects: ${projectList.join(',')}`;
}

function renderprojectSelect() {
    let projectSelect = document.getElementById('projectNameSelect');
    projectSelect.innerHTML = '';
    projectList.forEach(project => {
        let option = document.createElement('option');
        option.textContent = project;
        projectSelect.appendChild(option);
    })
}

function generateList() {
    domList.innerHTML = '';
    projectList.forEach(projectName => {
        let a = document.createElement('a');
        a.textContent = `-Name of the project: ${projectName}, To-Dos :`;
        domList.appendChild(a);
        toDoList.filter(todo => todo.projectName === projectName).forEach(todo => {
            let li = document.createElement('li');
            li.textContent = `Title: ${todo.title} Description: ${todo.description} Due date: ${todo.dueDate} Priority: ${todo.priority}`;
            let id = todo.id;
            let rmvbutton = document.createElement('button');
            li.append(rmvbutton);
            rmvbutton.textContent = 'x';

            let editButton = document.createElement('button');
            editButton.textContent = 'edit';
            li.append(editButton);
            li.classList.add(id);

            editButton.addEventListener('click', () => {
                populateEditValues(id);
            });

            rmvbutton.addEventListener('click', () => {
                removeFromList(id);
            });
            domList.appendChild(li);
        })
    });
}

function populateEditValues(id) {
    let todo = toDoList.filter(todo => todo.id === id)[0];
    inputTitle.value = todo.title;
    inputDescription.value = todo.description;
    inputDueDate.value = todo.dueDate;
    inputPriority.value = todo.priority;
    inputProjectName.value = todo.projectName;
    inputID.value = todo.id;
}

function removeFromList(id) {
    toDoList = toDoList.filter((todo) => todo.id != id);
    refresh();
}

function saveDataInLocalStorage() {
    localStorage.setItem(PROJECT_LIST_KEY, JSON.stringify(projectList));
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(toDoList));
}

refresh();