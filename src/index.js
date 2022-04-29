import './style.css';
import UI, { todoContainer } from '../modules/UI.js';

const form = document.querySelector('.input');

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (e) => UI.showBook(e));
  todoContainer.addEventListener('click', (e) => UI.onFocus(e));
  UI.renderTodo();
});
