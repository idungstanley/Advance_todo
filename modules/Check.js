const { getStorage, setStorage } = require('../modules/storage')

export default class Check {
  static check = (option, desc) => {
    let array = getStorage()
    array.forEach((checkItem) => {
      if (checkItem.description === desc) {
        checkItem.completed = option
      }
    })
    setStorage(array)
  }
}
