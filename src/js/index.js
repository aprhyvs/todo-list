import { addTodo, projectList } from "./projectModule.js";

let currentProject;
// const currentProjectEl = document.getElementById("project");

function setCurrentProject(projectIndex) {
    currentProject = projectList[projectIndex];
}

setCurrentProject(0);

addTodo(currentProject, "test", "desc", "tomorrow", true);
console.log(currentProject);

// currentProjectEl.textContent = currentProject.name;