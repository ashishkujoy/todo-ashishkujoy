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
      assert.deepEqual(todo.getAllItems(),{});
      todo.addItem('hello');
      let expected = {};
      expected.hello = new Item('hello');
      assert.deepEqual(todo.getAllItems(),expected);
    })
  })
  describe('deleteItem',function(){
    it('should delete a given item from the todo',function(){
      todo.addItem('hello');
      let expected = {};
      expected.hello = new Item('hello');
      assert.deepEqual(todo.getAllItems(),expected);
      todo.deleteItem('hello');
      assert.deepEqual(todo.getAllItems(),{});
    })
  })
  describe('markDone',function(){
    it('should mark a give item as done',function(){
      todo.addItem('hello');
      let expected = {};
      expected.hello = new Item('hello');
      assert.deepEqual(todo.getAllItems(),expected);
      todo.markDone('hello');
      expected.hello.markDone();
      assert.deepEqual(todo.getAllItems(),expected);
    })
  })
  describe('unMarkDone',function(){
    it('should mark a give item as not done',function(){
      todo.addItem('hello');
      let expected = {};
      todo.markDone('hello');
      expected.hello = new Item('hello');
      expected.hello.markDone();
      assert.deepEqual(todo.getAllItems(),expected);
      todo.unMarkDone('hello');
      expected.hello.unMarkDone();
      assert.deepEqual(todo.getAllItems(),expected);
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
      assert.deepEqual(todo.getAllItems(),expected);
      todo.editItemTitle('hello','byebye');
      expected={'byebye':new Item('byebye')}
      assert.deepEqual(todo.getAllItems(),expected);
    })
  })
})
