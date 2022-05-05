import Storage from './storage.js';

export default class Check {
  static check = (option, desc) => {
    const array = Storage.getStorage();
    array.forEach((checkItem) => {
      if (checkItem.description === desc) {
        checkItem.completed = option;
      }
    });
    Storage.setStorage(array);
  }
}