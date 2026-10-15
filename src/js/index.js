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
import { projectList } from "./projectModule.js";
import { createTodoElement, initTodoBtn } from "./todoItem.js";
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

export function renderTodoList(currentProjectParam) {
    const todoList = currentProjectParam.todoList;
    todoWrapperEl.innerHTML = "";

    for (const todo of todoList) {
        console.log(todo);
        todoWrapperEl.appendChild(createTodoElement(todo));
    }

    initTodoBtn();
}

setCurrentProject(0);

currentProject.addTodo("Clean up code", "The codebase is a mess!", "11/02/2028", "0");
currentProject.addTodo("Wake up early", "Go to bed NOW", "10/09/2026", "0");
currentProject.addTodo("Go home early", "Preferrably at 6PM.", "10/10/2026", "0");

renderTodoList(currentProject);
initAddTodoForm();
initSidebarProjectList();
initSidebarProjectListBtn();
