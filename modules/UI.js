import Task from './task.js'
import Check from './Check.js'

const { getStorage, setStorage } = require('./storage.js')

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
    const array = getStorage()
    let description = userInput.value
    for(let i= 0; i < array.length; i++){
      if(array[i].description === description){
        UI.clearField()
        return userInput.value = "This Task already exist!"
      }
    }
    const index = (array.length + 1).toString()
    const completed = false
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
    const localStore = getStorage()
    localStore.forEach((task) => {
      if (oldValue === task.description) {
        task.description = newInput
      }
    })
    setStorage(localStore)
  }

  static updateIndex = (index, array) => {
    for (let i = 0; i < array.length; i += 1) {
      if (index < array[i].index) {
        array[i].index -= 1
      }
    }
    return array
  }

  static deleteTodo = (event) => {
    const todos = getStorage()
    let found = null
    const li = event.target.parentElement.children[0]
    todos.forEach((todo) => {
      if (li.children[1].value === todo.description) {
        event.target.parentElement.remove()
        found = todo
      }
    })
    if (found != null) {
      const index = todos.indexOf(found)
      todos.splice(index, 1)
      UI.updateIndex(found.index, todos)
    }
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  static clearField = () => {
    userInput.value = ''
  }

  static onFocus = (e) => {
    const ArrayInput = Array.from(document.querySelectorAll('.text'))
    if (e.target.classList.contains('text')) {
      e.stopPropagation()
      ArrayInput.forEach((item) => {
        if (item.parentElement.parentElement.classList.contains('selected')) {
          const li = item.parentElement.parentElement
          li.classList.remove('selected')
          li.children[1].textContent = 'more_vertical'
          li.children[1].classList.remove('delete')
        }
      })
      if (e.target.classList.contains('text')) {
        e.target.parentElement.parentElement.classList.add('selected')
        const li = e.target.parentElement.parentElement
        li.children[1].textContent = 'delete_forever'
        li.children[1].classList.add('delete')
        li.children[1].addEventListener('click', (e) => {
          if (li.children[1].classList.contains('delete')) {
            UI.deleteTodo(e)
          }
        })
        const inputValue = e.target.value
        e.target.addEventListener('change', () => {
          const newInput = e.target.value
          UI.editText(newInput, inputValue)
        })
      }
    }
  }

  static checkBox = (e) => {
    console.log(e.target.classList.contains('check'))
    if (e.target.classList.contains('check')) {
      let box = e.target.parentElement.children[0]
      let description = e.target.parentElement.children[1]
      box.addEventListener('change', () => {
        if (box.checked) {
          description.classList.add('strike')
          Check.check(true, description.value)
        } else {
          description.classList.remove('strike')
          Check.check(false, description.value)
        }
      })
      console.log(e.target.parentElement.children[1].value)
      console.log(e.target.parentElement.children[0])
    }
  }

  static refresh = () =>{

  }

  static clearCompleted = ()=>{
    let array = getStorage();
    let filter = array.filter(check=> !check.completed === true)
    console.log(filter);
    setStorage(filter)
    // for(let i = 0; i < array.length; i+= 1){
    //   if(array[i].completed === true){
    //     array.filter()
    //   }
    // }
  }
}
