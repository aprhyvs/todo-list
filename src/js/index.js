import { projectList } from "./projectModule.js";

let currentProject;

const currentProjectEl = document.getElementById("project");
const projectListEl = document.getElementById("project-list");

function setCurrentProject(projectIndex) {
    currentProject = projectList[projectIndex];
    currentProjectEl.textContent = currentProject.name;
}

/**
 * append projectList from ProjectModule.js 
 * option elements with names and id
 */
projectList.forEach((e) => {
    const projectListOption = document.createElement("option")
    projectListOption.textContent = e.name

    projectListEl.appendChild(projectListOption)
});

projectListEl.addEventListener("change", () => {
    setCurrentProject(projectListEl.selectedIndex);
});

setCurrentProject(0);