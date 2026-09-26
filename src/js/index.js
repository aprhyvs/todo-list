import "../css/style.css";
import { initAddTodoForm } from "./addTodoForm.js";
import { projectList, addTodo } from "./projectModule.js";
import { deleteTodo } from "./todoItem.js";

export let currentProject;

const currentProjectEl = document.getElementById("project");
const projectListEl = document.getElementById("project-list");
const todoWrapperEl = document.getElementById("todo-list-wrapper");

function setCurrentProject(projectIndex) {
    currentProject = projectList[projectIndex];
    currentProjectEl.textContent = currentProject.name;
    todoWrapperEl.innerHTML = "";
    renderTodoList(currentProject);
    initTodoBtn();
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
    const status = document.createElement("p");

    const deleteBtn = document.createElement("button");
    const completeBtn = document.createElement("button");

    todoItem.classList.add("todo");
    todoItem.setAttribute("id", todo.id);

    title.classList.add("todo__title");
    desc.classList.add("todo__desc");
    due.classList.add("todo__due");
    status.classList.add("todo__status");
    priority.classList.add("todo__priority");

    deleteBtn.classList.add("todo__action");
    deleteBtn.setAttribute("data-action", "delete-todo");

    completeBtn.classList.add("todo__action");
    completeBtn.setAttribute("data-action", "complete-todo");

    title.textContent = todo.title;
    desc.textContent = todo.description;
    due.textContent = todo.dueDate;
    status.textContent = todo.done;
    priority.textContent = todo.priority;

    deleteBtn.textContent = "Delete Todo";
    completeBtn.textContent = "Mark as done";

    todoItem.appendChild(title);
    todoItem.appendChild(desc);
    todoItem.appendChild(due);
    todoItem.appendChild(status);
    todoItem.appendChild(priority);
    todoItem.appendChild(deleteBtn);
    todoItem.appendChild(completeBtn);

    return todoItem;
}

function initTodoBtn() {
    const todoItemElList = document.querySelectorAll(".todo");

    todoItemElList.forEach((element) => {
        element.addEventListener("click", (event) => {
            const actionSelected = event.target.dataset.action;
            const getTodoEl = event.target.parentNode;
            const getTodoId = event.target.parentNode.getAttribute("id");
            const getTodoIndex = currentProject.todoList.findIndex((e) => e.id === getTodoId);
            const getTodo = currentProject.todoList.find((e) => e.id === getTodoId);

            if (actionSelected === "delete-todo") {
                deleteTodo(getTodoEl, getTodoIndex);
            }

            if (actionSelected === "complete-todo") {
                getTodo.doneTodo();
                renderTodoList(currentProject);
                initTodoBtn(); // i am not sure if this is a good idea...
            }
        });
    });
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
initTodoBtn()
initAddTodoForm();