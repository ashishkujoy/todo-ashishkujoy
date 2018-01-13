const Todo = require('../appModules/todo.js');
const Item = require('../appModules/item.js');
const chai = require('chai');
const assert = chai.assert;
const User = require('../appModules/user.js');

let user = {};
beforeEach(function(){
  user = new User('ashish');
})

describe('User',function(){
  describe('addNewTodo',function(){
    it('should add a new todo in user todos',function(){
      assert.deepEqual(user.getAllTodo(),{});
      user.addNewTodo('hello');
      let expected = {'hello':new Todo('hello')};
      assert.deepEqual(user.getAllTodo(),expected);
      user.addNewTodo('byebye');
      assert.deepEqual(user.getAllTodo(),{'hello':new Todo('hello'),'byebye':new Todo('byebye')});
    })
  })
  describe('deleteTodo',function(){
    it('should delete a todo from user todos',function(){
      user.addNewTodo('hello');
      let expected = {'hello':new Todo('hello')};
      assert.deepEqual(user.getAllTodo(),expected);
      user.deleteTodo('hello');
      assert.deepEqual(user.getAllTodo(),{});
    })
  })
  describe('addTodoItem',function(){
    it('should add a new todo item in user todo',function(){
      user.addNewTodo('todo1');
      user.addTodoItem('todo1','this is an item')
      let expected = new Todo('todo1');
      expected.addItem('this is an item');
      assert.deepEqual(user.getTodo('todo1'),expected);
    })
  })
  describe('deleteItem',function(){
    it('should delete given todo item from user todo',function(){
      user.addNewTodo('todo1');
      user.addTodoItem('todo1','this is an item')
      let expected = new Todo('todo1');
      expected.addItem('this is an item');
      assert.deepEqual(user.getTodo('todo1'),expected);
      user.deleteTodoItem('todo1','this is an item');
      assert.deepEqual(user.getTodo('todo1'),new Todo('todo1'))
    })
  })
  describe('markItemDone',function(){
    it('should mark given item of specified todo as done',function(){
      user.addNewTodo('todo1');
      user.addTodoItem('todo1','this is an item');
      user.markItemDone('todo1','this is an item');
      let item = user.getTodo('todo1').getItem('this is an item');
      assert.isOk(item);
    })
  })
  describe('unMarkItemDone',function(){
    it('should mark given item of specified todo as done',function(){
      user.addNewTodo('todo1');
      user.addTodoItem('todo1','this is an item');
      user.markItemDone('todo1','this is an item');
      let item = user.getTodo('todo1').getItem('this is an item');
      assert.isOk(item.isDone());
      user.unMarkItemDone('todo1','this is an item');
      item = user.getTodo('todo1').getItem('this is an item');
      assert.isNotOk(item.isDone());
    })
  })
  describe('editTodoTitle',function(){
    it('should set title of a given todo to specified title',function(){
      user.addNewTodo('todo1');
      user.addTodoItem('todo1','this is testing item');
      let todo1Items = user.getTodo('todo1').getAllItems();
      user.editTodoTitle('todo1','todo1Edited');
      let todo1EditedItems = user.getTodo('todo1Edited').getAllItems();
      assert.deepEqual(todo1Items,todo1EditedItems);
    })
  })
  describe('editTodoDescription',function(){
    it('should change description of a specified todo',function(){
      user.addNewTodo('todo1');
      assert.equal(user.getTodoDescription('todo1'),'');
      user.editTodoDescription('todo1','description added');
      assert.equal(user.getTodoDescription('todo1'),'description added');
    })
  })
  describe('editTodoItemTitle',function(){
    it('should change title of a specified todo item',function(){
      user.addNewTodo('todo1');
      user.addTodoItem('todo1','this is an item');
      let expected = {'this is an item':new Item('this is an item')};
      assert.deepEqual(user.getTodo('todo1').getAllItems(),expected);
      user.editTodoItemTitle('todo1','this is an item','title changed');
      expected = {'title changed':new Item('title changed')};
      assert.deepEqual(user.getTodo('todo1').getAllItems(),expected);
    })
  })
})
