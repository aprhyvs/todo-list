import { projectList } from "./projectModule.js";
import { setCurrentProject, currentProject } from "./index.js";

/**
 * append projectList from ProjectModule.js 
 * into li and their respective ids.
 */
export function initSidebarProjectList() {
    const projectListEl = document.getElementById("sidebar-project-list");

    projectList.forEach((e) => {
        const projectListOption = document.createElement("li");
        const projectListOptionBtn = document.createElement("a");

        projectListOptionBtn.textContent = e.name;
        projectListOptionBtn.setAttribute("data-id", e.id);

        projectListEl.appendChild(projectListOption);
        projectListOption.appendChild(projectListOptionBtn)
    });
}

/**
 * event delegation for `li` elements.
 */
export function initSidebarProjectListBtn() {
    const projectListEl = document.getElementById("sidebar-project-list");

    projectListEl.addEventListener("click", (event) => {
        const getProjectId = event.target.getAttribute("data-id");
        const getProjectIndex = projectList.findIndex((e) => e.id === getProjectId);

        if (event.target.tagName === 'A') {
            if (getProjectId === currentProject.id) {
                console.log("thats the same though...");
                return;
            }

            setCurrentProject(getProjectIndex);
        }
    });
}
