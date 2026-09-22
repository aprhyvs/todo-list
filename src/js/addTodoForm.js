import { addTodo } from "./projectModule.js";
import { currentProject, renderTodoList } from "./index.js";

export function initAddTodoForm() {
    const addTodoFormEl = document.getElementById("add_todo_form");
    console.log(addTodoFormEl);

    addTodoFormEl.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("todo_title").value;
        const desc = document.getElementById("todo_description").value;
        const dueDate = document.getElementById("todo_due_date").value;
        const priority = document.getElementById("todo_priority").checked;

        if (title === "" ||
            dueDate === ""
        ) {
            console.log("some is empty")
            return;
        }

        if (desc === "") { 
            addTodo(currentProject, title, "Description not added.", dueDate, priority)
            renderTodoList(currentProject);
            return;
        }

        addTodo(currentProject, title, desc, dueDate, priority)
        renderTodoList(currentProject);
    });
}