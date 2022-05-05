import Task from './task.js';
import Check from './Check.js';
import Storage from './storage.js';

// const todoContainer = document.querySelector('.todo-container');

export default class UI {
  static createTodo = (todo) => {
    const todoList = document.createElement('li');
    todoList.setAttribute('id', todo.index);
    todoList.setAttribute('class', 'list-item');
    todoList.innerHTML = `<div class ="flex"><input type="checkbox" class ="check">
    <input type ="text" class="text" value = "${todo.description}"/></div> <span class = "material-icons gray vertical">more_vertical</span>`;
    document.querySelector('.todo-container').appendChild(todoList);
  }

  static add(todo) {
    const array = Storage.getStorage();
    const index = (array.length + 1).toString();
    const completed = false;
    const newTodo = new Task(todo.description, completed, index);
    array.push(newTodo);
    Storage.setStorage(array);
    return newTodo;
  }

  static showBook = (event) => {
    event.preventDefault();
    const array = Storage.getStorage();
    const userInput = document.querySelector('#input');
    const description = userInput.value;
    if (!description === '' || !array.some((value) => value.description === description)) {
      const newTodo = UI.add({ description })
      UI.createTodo(newTodo);
      UI.clearField();
    } else if (description === '') {
      userInput.value = 'Please Task cannot be blank';
      setTimeout(() => UI.clearField(), 1000);
    } else if (array.some((value) => value.description === userInput.value)) {
      userInput.value = 'Task already exist, please add another';
      setTimeout(() => UI.clearField(), 2000);
    }
  }

  static renderTodo = () => {
    const todos = Storage.getStorage();
    todos.forEach((todo) => {
      UI.createTodo(todo);
    });
  }

  static editText = (newInput, oldValue) => {
    const localStore = Storage.getStorage();
    localStore.forEach((task) => {
      if (oldValue === task.description) {
        task.description = newInput;
      }
    });
    Storage.getStorage(localStore);
  }

  static updateIndex = (array) => {
    array.forEach((array, index) => {
      array.index = index + 1;
    });
    return array;
  }

  static delete(index) {
    const todos = Storage.getStorage();
    todos.splice(parseInt(index, 10) - 1, 1);
    UI.updateIndex(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  static deleteTodo = (event) => {
    const todos = Storage.getStorage();
    let found = null;
    const li = event.target.parentElement.children[0];
    todos.forEach((todo) => {
      if (li.children[1].value === todo.description) {
        event.target.parentElement.remove();
        found = todo;
      }
    });
    if (found != null) {
      const index = todos.indexOf(found);
      this.delete(index);
    }
  }

  static clearField = () => {
    const userInput = document.querySelector('#input');
    userInput.value = '';
  }

  static onFocus = (e) => {
    const ArrayInput = Array.from(document.querySelectorAll('.text'));
    if (e.target.classList.contains('text')) {
      e.stopPropagation();
      ArrayInput.forEach((item) => {
        if (item.parentElement.parentElement.classList.contains('selected')) {
          const li = item.parentElement.parentElement;
          li.classList.remove('selected');
          li.children[1].textContent = 'more_vertical';
          li.children[1].classList.remove('delete');
        }
      });
      if (e.target.classList.contains('text')) {
        e.target.parentElement.parentElement.classList.add('selected');
        const li = e.target.parentElement.parentElement;
        li.children[1].textContent = 'delete_forever';
        li.children[1].classList.add('delete');
        li.children[1].addEventListener('click', (e) => {
          if (li.children[1].classList.contains('delete')) {
            UI.deleteTodo(e);
          }
        });
        const inputValue = e.target.value;
        e.target.addEventListener('change', () => {
          const newInput = e.target.value;
          UI.editText(newInput, inputValue);
        });
      }
    }
  }

  static checkBox = (e) => {
    if (e.target.classList.contains('check')) {
      const box = e.target.parentElement.children[0];
      const description = e.target.parentElement.children[1];
      box.addEventListener('change', () => {
        const isCheck = Array.from(document.querySelectorAll('.check:checked'));
        if (box.checked) {
          description.classList.add('strike');
          Check.check(true, description.value);
        } else {
          description.classList.remove('strike');
          Check.check(false, description.value);
        }

        const clearCheck = document.querySelector('.clearAll');
        clearCheck.addEventListener('click', (e) => {
          isCheck.forEach((check) => {
            check.parentElement.parentElement.remove();
          });
          UI.clearCompleted(e);
        });
      });
    }
  }

  static clearCompleted = () => {
    const array = Storage.getStorage();
    const filter = array.filter((check) => !check.completed === true);
    UI.updateIndex(filter);
    Storage.getStorage(filter);
  }
}