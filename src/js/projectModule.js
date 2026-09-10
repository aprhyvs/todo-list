import { Todo } from "./todoItem.js"

export const projectList = [];

class Project {
    constructor(name) {
        this.id = crypto.randomUUID()
        this.name = name;
        this.todoList = []
    }
}

function addProject(name) {
    projectList.push(new Project(name));
}

export function addTodo(
    projectName,
    title,
    description,
    dueDate,
    priority
) { 
    projectName.todoList.push(new Todo(title, description, dueDate, priority))
}

addProject("nuts")
addProject("joe")

// projectList.forEach(project => {
//     console.log(project)
// });

// console.log(projectList[0].id)
// refactor soon to use crypto.randomUUID to find the project of the todo to be added
// const projectIndex = projectList.findIndex((project) => project.name == "joe")