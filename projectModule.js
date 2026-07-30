import { Todo } from "./todoItem.js"

const projectList = [];

class Project {
    constructor(name) {
        this.name = name;
        this.todoList = []
    }
}

function addProject(name) {
    projectList.push(new Project(name));
}

addProject("nuts")
addProject("joe")

// refactor soon to use crypto.randomUUID to find the project of the todo to be added
const projectIndex = projectList.findIndex((project) => project.name == "joe")

projectList[projectIndex].todoList.push("test")

// subject to change
function addTodo(
    projectName,
    title,
    description,
    dueDate,
    priority
) {
    projectName.todoList.push(new Todo(title, description, dueDate, priority))
}

// const projectId = projectList.findIndex((project) => {project.name = "joe"})
// console.log(projectId)

// function addProject(name) {
//     projectList.push(new Project(name));
// }

// function addTodo(title, description, dueDate, priority) {
//     Project.todoList.push(new Todo(title, description, dueDate, priority));
// }