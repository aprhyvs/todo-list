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
    element.parentNode.remove(); // .todo

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
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo");
    todoItem.setAttribute("id", todo.id);

    todoItem.appendChild(createCompleteTodoBtn(todo));
    todoItem.appendChild(createTodoElementContent(todo));

    return todoItem;
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
    const todoItemContent = document.createElement("div");
    todoItemContent.classList.add("todo__content")

        const todoItemDetailWrapper = document.createElement("div");
        todoItemDetailWrapper.classList.add("todo__detail")

            const details = document.createElement("details")
            details.textContent = todo.description;

            const title = document.createElement("summary");
            title.textContent = todo.title;

            const due = document.createElement("span");
            due.textContent = todo.dueDate;

            details.appendChild(title);

        todoItemDetailWrapper.appendChild(details)
        todoItemDetailWrapper.appendChild(due)

    todoItemContent.appendChild(todoItemDetailWrapper)
    todoItemContent.appendChild(createDeleteTodoBtn());

    return todoItemContent
}

export function initTodoBtn() {
    const todoItemElList = document.querySelectorAll(".todo");

    todoItemElList.forEach((element) => {
        element.addEventListener("click", (event) => {
            const actionSelected = event.target.dataset.action;

            const getTodoEl = event.target.parentNode; //returns .todo__content
            const getTodoIndex = currentProject.todoList.findIndex((e) => e.id === getTodoEl.getAttribute("id"));
            if (actionSelected === "delete-todo") {
                deleteTodo(getTodoEl, getTodoIndex);
            }

            const getTodo = currentProject.todoList.find((e) => e.id === getTodoEl.getAttribute("id"));
            if (actionSelected === "complete-todo") {
                getTodo.doneTodo();
                renderTodoList(currentProject);
            }
        });
    });
}