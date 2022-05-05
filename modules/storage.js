class Storage {
  static setStorage = (todoList) => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  };

  static getStorage = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  };
}

export default Storage;