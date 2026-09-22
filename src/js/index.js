import "../css/style.css";
import { initAddTodoForm } from "./addTodoForm.js";
import { projectList, addTodo } from "./projectModule.js";

export let currentProject;

const currentProjectEl = document.getElementById("project");
const projectListEl = document.getElementById("project-list");
const todoWrapperEl = document.getElementById("todo-list-wrapper");

function setCurrentProject(projectIndex) {
    currentProject = projectList[projectIndex];
    currentProjectEl.textContent = currentProject.name;
    todoWrapperEl.innerHTML = "";
    renderTodoList(currentProject);
}

/**
 * append projectList from ProjectModule.js 
 * option elements with names and id
 */
projectList.forEach((e) => {
    const projectListOption = document.createElement("option")
    projectListOption.textContent = e.name

    projectListEl.appendChild(projectListOption)
});

projectListEl.addEventListener("change", () => {
    setCurrentProject(projectListEl.selectedIndex);
});

setCurrentProject(0);

addTodo(currentProject, "test", "desc", "today", true)
addTodo(currentProject, "test2", "desc2", "today2", false)
addTodo(currentProject, "test3", "desc3", "today3", true)

/**
 * todoItem as an element for todoWrapperEl
 * uses currentProject for renderTodoList()
 * @param {*} todo 
 * @returns 
 */
function createTodoItem(todo) {
    const todoItem = document.createElement("div");
    const title = document.createElement("h3");
    const desc = document.createElement("p");
    const due = document.createElement("p");
    const priority = document.createElement("p");    

    todoItem.classList.add("todo");
    title.classList.add("todo__title");
    desc.classList.add("todo__desc");
    due.classList.add("todo__due");
    priority.classList.add("todo__priority");

    title.textContent = todo.title
    desc.textContent = todo.description
    due.textContent = todo.dueDate
    priority.textContent = todo.priority

    todoItem.appendChild(title);
    todoItem.appendChild(desc);
    todoItem.appendChild(due);
    todoItem.appendChild(priority);

    return todoItem;
}

export function renderTodoList(currentProjectParam) {
    const todoList = currentProjectParam.todoList;
    todoWrapperEl.innerHTML = "";

    for (const todo of todoList) {
        console.log(todo)
        todoWrapperEl.appendChild(createTodoItem(todo))
    }
}

renderTodoList(currentProject);
initAddTodoForm();