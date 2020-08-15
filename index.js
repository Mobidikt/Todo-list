import { todos } from "./components/initial-todos.js";
import {
  todosInputElement,
  todosSubmitBtn,
  todosTemplateElement,
  todosListElement,
  todosFormElement,
} from "./components/constants.js";

let editedElement = null;

function addTodoListeners(todo) {
  todo
    .querySelector(".todo__btn_type_delete")
    .addEventListener("click", handleDelete);
  todo
    .querySelector(".todo__btn_type_edit")
    .addEventListener("click", handleEdit);
  todo
    .querySelector(".todo__btn_type_duplicate")
    .addEventListener("click", handleDuplicate);
}

function handleDelete(evt) {
  const todo = evt.currentTarget.closest(".todo");
  todo.remove();
  resetTodoForm();
}

function setTodoToForm(todo) {
  const text = todo.querySelector(".todo__text").textContent;
  todosInputElement.value = text;
  todosSubmitBtn.textContent = "Сохранить";
}

function resetTodoForm() {
  editedElement = null;
  todosInputElement.value = "";
  todosSubmitBtn.textContent = "Добавить";
}

function handleEdit(evt) {
  const todo = evt.currentTarget.closest(".todo");

  editedElement = todo;
  setTodoToForm(todo);
}

function handleDuplicate(evt) {
  const todo = evt.currentTarget.closest(".todo");

  const duplicate = todo.cloneNode(true);

  addTodoListeners(duplicate);
  todo.after(duplicate);
}

function createTodo(text) {
  const todo = todosTemplateElement.content.cloneNode(true);

  todo.querySelector(".todo__text").textContent = capitalize(text);
  addTodoListeners(todo);

  return todo;
}

function addTodo(todo) {
  todosListElement.prepend(todo);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const text = todosInputElement.value;

  if (editedElement) {
    editedElement.querySelector(".todo__text").textContent = text;
  } else {
    if (text !== "") {
      const newTodo = createTodo(text);
      addTodo(newTodo);
    }
  }
  resetTodoForm();
}

todos.forEach((text) => {
  const todo = createTodo(text);
  addTodo(todo);
});

todosFormElement.addEventListener("submit", handleFormSubmit);

function capitalize(text) {
  if (!text || typeof text !== "string");

  return text[0].toUpperCase() + text.slice(1);
}
