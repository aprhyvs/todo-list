import { currentProject, renderTodoList } from "./index.js";

export class Todo {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
    }

    doneTodo() {
        this.done = !this.done;
    }
}

export function deleteTodo(element, getTodoIndex) {
    element.remove();

    const currentTodoList = currentProject.todoList 

    currentTodoList.splice(getTodoIndex, 1)
};

/**
 * todoItem as an element for todoWrapperEl
 * uses currentProject for renderTodoList()
 * @param {*} todo 
 * @returns 
 */
export function createTodoElement(todo) {
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

export function initTodoBtn() {
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
            }
        });
    });
}