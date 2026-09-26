import { currentProject } from "./index.js";

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