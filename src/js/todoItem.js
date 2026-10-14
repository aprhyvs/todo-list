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

    changePriority(priority) {
        this.priority = priority;
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
    todoEl.setAttribute("data-prioritylist", "closed")

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

function createPriorityTodoBtn() {
    const priorityBtn = document.createElement("button");
    priorityBtn.textContent = "Change Priority";
    priorityBtn.classList.add("todo__action");
    priorityBtn.setAttribute("data-action", "open-change-priority");

    return priorityBtn
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
        todoElActions.appendChild(createPriorityTodoBtn())

    todoElContent.appendChild(todoElDetailWrapper)
    todoElContent.appendChild(todoElActions);

    return todoElContent
}

function createPriorityChoiceList () {
    const wrapper = document.createElement("div")
    wrapper.classList.add("priority")

    wrapper.appendChild(createPriorityChoices(0))
    wrapper.appendChild(createPriorityChoices(1))
    wrapper.appendChild(createPriorityChoices(2))
    wrapper.appendChild(createPriorityChoices(3))

    return wrapper
}

function createPriorityChoices(priority) {
    const button = document.createElement("button");
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z"/></svg>
    `
    button.setAttribute("data-priority", priority);

    return button
}

function initPriorityChoiceBtn() {
    const getTodoEl = event.target.closest(".todo");

    if(event.target.tagName === "BUTTON") {
        const getTodo = currentProject.todoList.find((e) => e.id === getTodoEl.getAttribute("id"));
        getTodo.changePriority(event.target.dataset.priority)
        renderTodoList(currentProject);
    }
}

export function initTodoBtn() {
    const todoElList = document.querySelectorAll(".todo");

    todoElList.forEach((element) => {
        element.addEventListener("click", (event) => {
            const actionSelected = event.target.dataset.action;
            const getTodoEl = event.target.closest(".todo");

            if (actionSelected === "complete-todo") {
                const getTodo = currentProject.todoList.find((e) => e.id === getTodoEl.getAttribute("id"));
                getTodo.doneTodo();
                renderTodoList(currentProject);
            }

            if (actionSelected === "delete-todo") {
                const getTodoIndex = currentProject.todoList.findIndex((e) => e.id === getTodoEl.getAttribute("id"));
                deleteTodo(getTodoEl, getTodoIndex);
            }

            if (actionSelected === "open-change-priority") {
                const priorityListToOpen = getTodoEl.dataset.prioritylist;

                if (priorityListToOpen === "closed") {
                    /**
                     * stores the last open .priority
                     * returns null if nothing is open
                     */
                    const openPriority = document.querySelector(".priority");

                    if (openPriority) {
                        openPriority.closest(".todo").dataset.prioritylist = "closed";
                        openPriority.remove();
                    }

                    getTodoEl.dataset.prioritylist = "open"
                    getTodoEl.appendChild(createPriorityChoiceList())
                    getTodoEl.querySelector(".priority").addEventListener("click", initPriorityChoiceBtn)
                } 

                if (priorityListToOpen === "open") {
                    getTodoEl.dataset.prioritylist = "closed"
                    getTodoEl.querySelector(".priority").removeEventListener("click", initPriorityChoiceBtn)
                    getTodoEl.querySelector(".priority").remove()
                }
            }
        });
    });
}
