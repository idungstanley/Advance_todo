import Task from './task.js'
const { getStorage, setStorage } = require('../modules/storage.js')

export const todoContainer = document.querySelector('.todo-container')
const userInput = document.querySelector('#input')

export default class UI {
  static createTodo = (todo) => {
    const todoList = document.createElement('li')
    todoList.setAttribute('id', todo.index)
    todoList.setAttribute('class', 'list-item')
    todoList.innerHTML = `<div class ="flex"><input type="checkbox" class ="check">
    <input type ="text" class="text" value = "${todo.description}"/></div> <span class = "material-icons gray vertical">more_vertical</span>`
    todoContainer.appendChild(todoList)
  }

  static showBook = (event) => {
    event.preventDefault()
    let array = getStorage()
    let description = userInput.value
    let index = (array.length + 1).toString()
    let completed = false
    const todo = new Task(description, completed, index)
    array.push(todo)
    setStorage(array)
    UI.createTodo(todo)
    UI.clearField()
  }

  static renderTodo = () => {
    const todos = getStorage()
    todos.forEach((todo) => {
      UI.createTodo(todo)
    })
  }

  static editText = (newInput, oldValue) => {
    let localStore = getStorage()
    localStore.forEach((task) => {
      if (oldValue === task.description) {
        task.description = newInput
      }
    })
    setStorage(localStore)
  }

  static updateIndex = (index, array) => {
    const num = index + 1
    for (let i = num; i < array.length; i += 1) {
      array[i].index -= 1
    }
    return array
  }

  static deleteTodo = (event) => {
    const todos = getStorage()
    let found = null
    todos.forEach((todo) => {
      if (event.target.parentElement.id === todo.index) {
        event.target.parentElement.remove()
        found = todo
      }
    })
    if (found != null) {
      todos.splice(todos.indexOf(found), 1)
      todos.forEach(t=>{
       if(t.index > todos.indexOf(found)){
        t.index -= 1;
       }
      })
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }

  static clearField = () => {
    userInput.value = ''
  }

  static onFocus = (e) => {
    const Array_input = Array.from(document.querySelectorAll('.text'))
    if (e.target.classList.contains('text')) {
      e.stopPropagation()
      Array_input.forEach((item) => {
        if (item.parentElement.parentElement.classList.contains('selected')) {
          let li = item.parentElement.parentElement
          li.classList.remove('selected')
          li.children[1].textContent = 'more_vertical'
          li.children[1].classList.remove('delete')
        }
      })
      if (e.target.classList.contains('text')) {
        e.target.parentElement.parentElement.classList.add('selected')
        let li = e.target.parentElement.parentElement
        li.children[1].textContent = 'delete_forever'
        li.children[1].classList.add('delete')
        li.children[1].addEventListener('click', (e) => {
          if (li.children[1].classList.contains('delete')) {
            UI.deleteTodo(e)
          }
        })
        let inputValue = e.target.value
        e.target.addEventListener('change', () => {
          const newInput = e.target.value
          UI.editText(newInput, inputValue)
        })
      }
    }
  }
}
