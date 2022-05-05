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

  
  describe('DOM tests', () => {
    let before = null;

    beforeEach(() => {
      document.body.innerHTML = htmlDocument;
      before = document.querySelectorAll('.todo-container li');
    })

    it('showBook(event)', ()=>{
      const event = {
        preventDefault: () => {},
      }

      UI.showBook(event);

      const after = document.querySelectorAll('.todo-container li');
      expect(after).toBeDefined();
      expect(after).toHaveLength(before.length + 1);
    })

    it('deleteTodo(event)', ()=>{
      document.querySelector('.todo-container').innerHTML = `
        <li id="1" class="list-item">
          <div class="flex">
            <input type="checkbox" class="check" />
            <input type="text" class="text" value="Hello World!" />
          </div>
          <span class="material-icons gray vertical">more_vertical</span>
        </li>`;

      Storage.setStorage([{
        description: 'Hello World!',
        completed: false,
        index: "1"
      }]);

      const after = document.querySelectorAll('.todo-container li');
      expect(after).toBeDefined();
      expect(after).toHaveLength(before.length + 1);

      const list = document.querySelector('.todo-container');
      const btnElement = list.querySelector('.material-icons');

      const event2 = {
        type: 'click',
        target: btnElement,
        preventDefault: () => {},
      };

      const beforeDelete = document.querySelectorAll('.todo-container li');
      expect(UI.deleteTodo(event2));
      const afterDelete = document.querySelectorAll('.todo-container li');

      expect(afterDelete).toBeDefined();
      expect(afterDelete).toHaveLength(beforeDelete.length - 1);

    })
  })

})