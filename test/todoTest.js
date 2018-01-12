const Todo = require('../appModules/todo.js');
const Item = require('../appModules/item.js');
const chai = require('chai');
const assert = chai.assert;

describe('Todo',function(){
  let todo = {};
  beforeEach(function(){
    todo = new Todo('testing');
  })
  describe('addItem',function(){
    it('should add a new todo item',function(){
      assert.deepEqual(todo.getItems(),{});
      todo.addItem('hello');
      let expected = {};
      expected.hello = new Item('hello');
      assert.deepEqual(todo.getItems(),expected);
    })
  })
  describe('deleteItem',function(){
    it('should delete a given item from the todo',function(){
      todo.addItem('hello');
      let expected = {};
      expected.hello = new Item('hello');
      assert.deepEqual(todo.getItems(),expected);
      todo.deleteItem('hello');
      assert.deepEqual(todo.getItems(),{});
    })
  })
  describe('markDone',function(){
    it('should mark a give item as done',function(){
      todo.addItem('hello');
      let expected = {};
      expected.hello = new Item('hello');
      assert.deepEqual(todo.getItems(),expected);
      todo.markDone('hello');
      expected.hello.markDone();
      assert.deepEqual(todo.getItems(),expected);
    })
  })
  describe('unMarkDone',function(){
    it('should mark a give item as not done',function(){
      todo.addItem('hello');
      let expected = {};
      todo.markDone('hello');
      expected.hello = new Item('hello');
      expected.hello.markDone();
      assert.deepEqual(todo.getItems(),expected);
      todo.unMarkDone('hello');
      expected.hello.unMarkDone();
      assert.deepEqual(todo.getItems(),expected);
    })
  })
  describe('editTitle',function(){
    it('should change the todo title to given title',function(){
      assert.equal(todo.getTitle(),'testing');
      todo.editTitle('again testing');
      assert.equal(todo.getTitle(),'again testing');
    })
  })
  describe('editDescription',function(){
    it('should change the todo title to given title',function(){
      assert.equal(todo.getDescription(),'');
      todo.editDescription('description');
      assert.equal(todo.getDescription(),'description');
    })
  })
  describe('editItemTitle',function(){
    it('should change the title of give item to given title',function(){
      todo.addItem('hello');
      let expected = {};
      expected.hello = new Item('hello');
      assert.deepEqual(todo.getItems(),expected);
      todo.editItemTitle('hello','byebye');
      expected.hello.changeTitle('byebye');
      assert.deepEqual(todo.getItems(),expected);
    })
  })
})
