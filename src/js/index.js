import "../css/reset.css";
import "../font/font.css";
import "../css/shell.css";
import "../css/style.css";
import "../css/modal.css";
import "../css/form.css";
import "../css/sidebar.css";
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

export function renderTodoList(currentProjectParam) {
    const todoList = currentProjectParam.todoList;
    todoWrapperEl.innerHTML = "";

    for (const todo of todoList) {
        console.log(todo)
        todoWrapperEl.appendChild(createTodoElement(todo))
    }

    initTodoBtn()
}

setCurrentProject(0);

addTodo(currentProject, "test", "desc", "today", true)
addTodo(currentProject, "test2", "desc2", "today2", false)
addTodo(currentProject, "test3", "desc3", "today3", true)

renderTodoList(currentProject);
initAddTodoForm();
initSidebarProjectList();
initSidebarProjectListBtn();