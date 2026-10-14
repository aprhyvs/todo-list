import "../css/reset.css";
import "../font/font.css";
import "../css/shell.css";
import "../css/style.css";
import "../css/modal.css";
import "../css/form.css";
import "../css/sidebar.css";
import "../css/todo.css";
import "../css/priority.css";
import { initAddTodoForm } from "./addTodoForm.js";
import { projectList, addTodo } from "./projectModule.js";
import { deleteTodo, createTodoElement, initTodoBtn } from "./todoItem.js";
import { initSidebarProjectList, initSidebarProjectListBtn } from "./sidebar.js";

export let currentProject;

const currentProjectEl = document.getElementById("project");
const todoWrapperEl = document.getElementById("todo-list-wrapper");

export function setCurrentProject(projectIndex) {
    currentProject = projectList[projectIndex];
    currentProjectEl.textContent = currentProject.name;
    todoWrapperEl.innerHTML = "";
    renderTodoList(currentProject);
}

// issue: this is called twice on page load,
//        hence event listeners for initPriorityChange
//        is added twice. i only added a check if
//        the element has no attribute: add the listener
//        if it has a listener, don't add it again.
export function renderTodoList(currentProjectParam) {
    const todoList = currentProjectParam.todoList;
    todoWrapperEl.innerHTML = "";

    for (const todo of todoList) {
        console.log(todo);
        todoWrapperEl.appendChild(createTodoElement(todo));
    }

    initTodoBtn();
    // initPriorityChange();
}

setCurrentProject(0);

addTodo(currentProject, "Clean up code", "The codebase is a mess!", "11/02/2028", "0")
addTodo(currentProject, "Wake up early", "Go to bed NOW", "10/09/2026", "0")
addTodo(currentProject, "Go home early", "Preferrably at 6PM.", "10/10/2026", "0")

renderTodoList(currentProject);
initAddTodoForm();
initSidebarProjectList();
initSidebarProjectListBtn();