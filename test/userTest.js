const Todo = require('../src/appModels/todo.js');
const Item = require('../src/appModels/item.js');
const chai = require('chai');
const assert = chai.assert;
const User = require('../src/appModels/user.js');

let user = {};
beforeEach(function(){
  user = new User('ashish');
})

describe('User',function(){
  describe('addNewTodo',function(){
    it('should add a new todo in user todos',function(){
      assert.deepEqual(user.getAllTodo(),{});
      let todoId=user.addNewTodo('hello');
      let expected = {[todoId]:new Todo(0,'hello')};
      assert.deepEqual(user.getAllTodo(),expected);
    })
  })
  describe('deleteTodo',function(){
    it('should delete a todo from user todos',function(){
      user.addNewTodo('hello');
      let expected = {0:new Todo(0,'hello')};
      assert.deepEqual(user.getAllTodo(),expected);
      user.deleteTodo(0);
      assert.deepEqual(user.getAllTodo(),{});
    })
  })
  describe('addTodoItem',function(){
    it('should add a new todo item in user todo',function(){
      user.addNewTodo('todo1');
      user.addTodoItem(0,'this is an item')
      let expected = new Todo(0,'todo1');
      expected.addItem('this is an item');
      assert.deepEqual(user.getTodo(0),expected);
    })
  })
  describe('deleteItem',function(){
    it('should delete given todo item from user todo',function(){
      user.addNewTodo('todo1');
      user.addTodoItem(0,'this is an item');
      user.deleteTodoItem(0,0);
      let expected = new Todo(0,'todo1');
      expected._uniqueIdCounter++;
      assert.deepEqual(user.getTodo(0),expected);
    })
  })
  describe('markItemDone',function(){
    it('should mark given item of specified todo as done',function(){
      user.addNewTodo('todo1');
      user.addTodoItem(0,'this is an item');
      user.markItemDone(0,0);
      let item = user.getTodo(0).getItem(0);
      assert.isOk(item);
    })
  })
  describe('unMarkItemDone',function(){
    it('should mark given item of specified todo as done',function(){
      user.addNewTodo('todo1');
      user.addTodoItem(0,'this is an item');
      user.markItemDone(0,0);
      let item = user.getTodo(0).getItem(0);
      assert.isOk(item.isDone());
      user.unMarkItemDone(0,0);
      item = user.getTodo(0).getItem(0);
      assert.isNotOk(item.isDone());
    })
  })
  describe('editTodoTitle',function(){
    it('should set title of a given todo to specified title',function(){
      user.addNewTodo('todo1');
      user.addTodoItem(0,'this is testing item');
      let todo1Items = user.getTodo(0).getAllItems();
      user.editTodoTitle(0,'todo1Edited');
      let todo1EditedItems = user.getTodo(0).getAllItems();
      assert.deepEqual(todo1Items,todo1EditedItems);
    })
  })
  describe('editTodoDescription',function(){
    it('should change description of a specified todo',function(){
      user.addNewTodo('todo1');
      assert.equal(user.getTodoDescription(0),'');
      user.editTodoDescription(0,'description added');
      assert.equal(user.getTodoDescription(0),'description added');
    })
  })
  describe('editTodoItemTitle',function(){
    it('should change title of a specified todo item',function(){
      let todoId = user.addNewTodo('todo1');
      let itemId=user.addTodoItem(todoId,'this is an item');
      let expected = {[todoId]:new Item('this is an item',0)};
      assert.deepEqual(user.getTodo(todoId).getAllItems(),expected);
      user.editTodoItemTitle(todoId,itemId,'title changed');
      expected = {[todoId]:new Item('title changed',0)};
      assert.deepEqual(user.getTodo(todoId).getAllItems(),expected);
    })
  })
})
