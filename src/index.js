import './style.css'
import UI, { todoContainer } from '../modules/UI.js'

const form = document.querySelector('.input');
const clearCheck = document.querySelector(".clearAll")

// const checkbox = document.querySelector('.check')

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (e) => UI.showBook(e))
  clearCheck.addEventListener("click", UI.clearCompleted)
  todoContainer.addEventListener('click', (e) => {
    UI.onFocus(e)
    UI.checkBox(e)
  }
  )
  UI.clearCompleted()
  UI.renderTodo()
})
