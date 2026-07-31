import { Todo } from "./todoItem.js"

let currentProject;
const projectList = [];

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

function setCurrentProject(projectIndex) {
    currentProject = projectList[projectIndex]
}

function addTodo(
    projectName,
    title,
    description,
    dueDate,
    priority
) { projectName.todoList.push(new Todo(title, description, dueDate, priority))
}

addProject("nuts")
addProject("joe")

setCurrentProject(0)

addTodo(currentProject, "test", "desc", "tomorrow", true)

// refactor soon to use crypto.randomUUID to find the project of the todo to be added
// const projectIndex = projectList.findIndex((project) => project.name == "joe")