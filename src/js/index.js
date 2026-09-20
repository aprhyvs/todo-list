import "../css/style.css";
import { projectList, addTodo } from "./projectModule.js";

let currentProject;

const currentProjectEl = document.getElementById("project");
const projectListEl = document.getElementById("project-list");

function setCurrentProject(projectIndex) {
    currentProject = projectList[projectIndex];
    currentProjectEl.textContent = currentProject.name;
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

const todoWrapperEl = document.getElementById("todo-list-wrapper");

// code in appending todo items into todoWrapperEl
const todoTemplate = document.getElementById("todo-item");
const fragment = document.createDocumentFragment();

/** 
 * render todoItem class from its currentProject
 * and append it on todoWrapperEl
 * @param {*} currentProjectParam 
 */
function renderTodoItems(currentProjectParam) {
    const todoList = currentProjectParam.todoList

    for (const todo of todoList) {
        console.log(todo)
        const clone = todoTemplate.content.cloneNode(true)

        clone.querySelector(".todo__title").textContent = todo.title
        clone.querySelector(".todo__desc").textContent = todo.description
        clone.querySelector(".todo__due").textContent = todo.dueDate
        clone.querySelector(".todo__priority").textContent = todo.priority

        fragment.appendChild(clone)
    }

    todoWrapperEl.appendChild(fragment)
}

renderTodoItems(currentProject)