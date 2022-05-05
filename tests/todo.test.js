import UI from '../modules/UI.js'
import Storage from '../modules/storage.js'

const htmlDocument = `
<section class="book-container">
  <div class="header">
    <h5>Today's To Do</h5>
    <span class="material-icons gray">autorenew</span>
  </div>
  <form class="input">
    <input type="text" id="input" value="Mock Test" />
    <button type="submit" class="material-icons gray key">
      keyboard_return
    </button>
  </form>
  <ul class="todo-container"></ul>
</section>`;

describe('Testing the TODO app', () => {

  describe('Data tests', () => {

    it('add(task)', () => {
      const task = {
        description: 'Hello World!',
        completed: false,
        index: "1"
      }

      expect(UI.add(task)).toEqual(task);
      expect(Storage.getStorage()).toHaveLength(1);
      expect(Storage.getStorage()[0]).toEqual(task);
    })

    it('delete(index)', () => {
      Storage.setStorage([{
        description: 'Hello World!',
        completed: false,
        index: "1"
      }]);

      expect(UI.delete(1));
      expect(Storage.getStorage()).toBeDefined();
      expect(Storage.getStorage()).toHaveLength(0);
    })
  })

  
