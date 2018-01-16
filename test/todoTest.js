const Todo = require('../src/appModels/todo.js');
const Item = require('../src/appModels/item.js');
const chai = require('chai');
const assert = chai.assert;

describe('Todo',function(){
  let todo = {};
  beforeEach(function(){
    todo = new Todo(1,'testing');
  })
  describe('addItem',function(){
    it('should add a new todo item',function(){
      assert.deepEqual(todo.getAllItems(),{});
      todo.addItem('hello');
      let expected = {};
      expected[0] = new Item('hello',0);
      assert.deepEqual(todo.getAllItems(),expected);
    })
  })
  describe('deleteItem',function(){
    it('should delete a given item from the todo',function(){
      todo.addItem('hello');
      let expected = {};
      expected[0] = new Item('hello',0);
      assert.deepEqual(todo.getAllItems(),expected);
      todo.deleteItem(0);
      assert.deepEqual(todo.getAllItems(),{});
    })
  })
  describe('markDone',function(){
    it('should mark a give item as done',function(){
      todo.addItem('hello');
      let expected = {};
      expected[0] = new Item('hello',0);
      assert.deepEqual(todo.getAllItems(),expected);
      todo.markDone(0);
      expected[0].markDone();
      assert.deepEqual(todo.getAllItems(),expected);
    })
  })
  describe('unMarkDone',function(){
    it('should mark a give item as not done',function(){
      todo.addItem('hello');
      let expected = {};
      todo.markDone(0);
      expected[0] = new Item('hello',0);
      expected[0].markDone();
      assert.deepEqual(todo.getAllItems(),expected);
      todo.unMarkDone(0);
      expected[0].unMarkDone();
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
      todo.editItemTitle(0,'bye');
      let actual = todo.getAllItems();
      let expected = {0:new Item('bye',0)}
      assert.deepEqual(actual,expected);
    })
  })
})
