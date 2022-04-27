const setStorage = (todoList) => {
  localStorage.setItem('todos', JSON.stringify(todoList));
};
const getStorage = () => {
  JSON.parse(localStorage.getItem('todos'));
};

module.exports = {
  getStorage,
  setStorage,
};
