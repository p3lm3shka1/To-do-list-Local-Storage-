const addBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskEmpty = document.getElementById("taskEmpty");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

const render = () => {
  taskList.innerHTML = "";

  if (todos.length === 0) {
    taskEmpty.style.visibility = "visible";
  } else {
    taskEmpty.style.visibility = "hidden";
  }

  todos.forEach((text, index) => {
    taskList.innerHTML += `
      <li>
        ${text}
        <button class="delete-btn" data-index="${index}">X</button>
      </li>
    `;
  });
};

addBtn.addEventListener("click", () => {
  const text = taskInput.value;
  if (text === "") return;

  todos.push(text);
  localStorage.setItem("todos", JSON.stringify(todos));

  taskInput.value = "";
  render();
});

taskList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const index = Number(e.target.dataset.index);
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
});

render();
