import { Todo } from "./todoItem.js"

export const projectList = [];

class Project {
    constructor(name) {
        this.id = crypto.randomUUID()
        this.name = name;
        this.todoList = []
    }

    addTodo(
        title,
        description,
        dueDate,
        priority = 0,        
    ) {
        this.todoList.push(new Todo(title, description, dueDate, priority));
    }
}

function addProject(name) {
    projectList.push(new Project(name));
}

addProject("default")
addProject("nuts")
addProject("joe")