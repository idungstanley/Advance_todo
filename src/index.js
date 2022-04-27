import './style.css';

const { getStorage, setStorage } = require('../modules/storage.js');

const todoContainer = document.querySelector('.todo-container');
const userInput = document.querySelector('#input');

const array = [
  { description: 'my first assignment', completed: 'true', index: 0 },
  { description: 'Going to the today', completed: 'true', index: 1 },
  { description: 'read my book', completed: 'true', index: 2 },
  { description: 'read my book', completed: 'true', index: 3 },
  { description: 'read my book', completed: 'true', index: 4 },
  { description: 'read my book', completed: 'true', index: 5 }];

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  static createTodo = (todo) => {
    const todoList = document.createElement('li');
    todoList.setAttribute('id', todo.index);
    todoList.innerHTML = `<div class ="flex"><input type="checkbox" class ="check"><p>${todo.description}</p></div> <span class = "material-icons gray">more_vertical</span>`;
    todoContainer.appendChild(todoList);
  }

  static showBook = (event) => {
    event.preventDefault();
    array.forEach((todo) => {
      Task.createTodo(todo);
    });
    Task.clearField();
    setStorage(array);
  }

  static renderTodo = () => {
    const todos = getStorage();
    todos.forEach((todo) => {
      Task.createTodo(todo);
    });
  }

  static clearField = () => {
    userInput.value = '';
  }
}

document.addEventListener('DOMContentLoaded', Task.showBook);
