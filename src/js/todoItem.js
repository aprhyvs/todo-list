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
    element.remove(); // .todo

    const currentTodoList = currentProject.todoList 

    currentTodoList.splice(getTodoIndex, 1)
};

/**
 * todoItem as an element for todoWrapperEl
 * uses currentProject for renderTodoList()
 * @param {currentProject.todoList} todo 
 * @returns 
 */
export function createTodoElement(todo) {
    const todoEl = document.createElement("div");
    todoEl.classList.add("todo");
    todoEl.setAttribute("id", todo.id);

    todoEl.appendChild(createCompleteTodoBtn(todo));
    todoEl.appendChild(createTodoElementContent(todo));

    return todoEl;
}

function createCompleteTodoBtn(todo) {
    const completeBtn = document.createElement("input");
    completeBtn.type = "checkbox";
    completeBtn.classList.add("todo__action");
    completeBtn.setAttribute("data-action", "complete-todo");

    if (todo.done === true ? 
    completeBtn.checked = true : 
    completeBtn.checked = false);

    return completeBtn
}

function createDeleteTodoBtn() {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Todo";
    deleteBtn.classList.add("todo__action");
    deleteBtn.setAttribute("data-action", "delete-todo");

    return deleteBtn
}

function createTodoElementContent(todo) {
    const todoElContent = document.createElement("div");
    todoElContent.classList.add("todo__content")

        const todoElDetailWrapper = document.createElement("div");
        todoElDetailWrapper.classList.add("todo__detail")

            const details = document.createElement("details")
            details.textContent = todo.description;

            const title = document.createElement("summary");
            title.textContent = todo.title;

            const due = document.createElement("span");
            due.textContent = todo.dueDate;

            details.appendChild(title);

        todoElDetailWrapper.appendChild(details)
        todoElDetailWrapper.appendChild(due)

        const todoElActions = document.createElement("div");
        todoElActions.classList.add("todo__actions");

        todoElActions.appendChild(createDeleteTodoBtn())

    todoElContent.appendChild(todoElDetailWrapper)
    todoElContent.appendChild(todoElActions);

    return todoElContent
}

export function initTodoBtn() {
    const todoElList = document.querySelectorAll(".todo");

    todoElList.forEach((element) => {
        element.addEventListener("click", (event) => {
            const actionSelected = event.target.dataset.action;
            const getTodoEl = event.target.closest(".todo");

            if (actionSelected === "delete-todo") {
                const getTodoIndex = currentProject.todoList.findIndex((e) => e.id === getTodoEl.getAttribute("id"));
                deleteTodo(getTodoEl, getTodoIndex);
            }

            if (actionSelected === "complete-todo") {
                const getTodo = currentProject.todoList.find((e) => e.id === getTodoEl.getAttribute("id"));
                getTodo.doneTodo();
                renderTodoList(currentProject);
            }
        });
    });
}