const chai = require('chai');
const assert = chai.assert;
let request = require('./requestSimulator.js');
let UserRegistry = require('../src/appModels/userRegistry.js');
const User = require('../src/appModels/user.js')
const Todo = require('../src/appModels/todo.js');
let th = require('./testHelpers.js');
let userRegistry = {};
beforeEach(function(){
  userRegistry = new UserRegistry('./appTestData.json');
})
describe('UserRegistry',function(){
  describe('getUser',function(){
    it('should give the given user',function(){
      userRegistry.addNewUser('arvind');
      let actual = userRegistry.getUser('arvind');
      assert.deepEqual(actual,new User('arvind'));
    })
  })
  describe('addNewTodo',function(){
    it('should add a new todo with given detail to given user todos',function(){
      userRegistry.addNewUser('joy');
      let todoId = userRegistry.addNewTodo('joy',{title:'first todo'});
      let actual = userRegistry.getUser('joy')._todos;
      let expected = {[todoId]:new Todo(0,'first todo')}
      assert.deepEqual(actual,expected);
    })
  })
  describe('deleteTodo',function(){
    it('should delete a todo of a given user',function(){
      userRegistry.addNewUser('joy');
      let todoId = userRegistry.addNewTodo('joy',{title:'first todo'});
      let actual = userRegistry.getUser('joy')._todos;
      let expected = {[todoId]:new Todo(0,'first todo')}
      assert.deepEqual(actual,expected);
      userRegistry.deleteTodo('joy',todoId);
      actual = userRegistry.getUser('joy')._todos;
      assert.deepEqual(actual,{});
    })
  })
  describe('editTodoTitle',function(){
    it('should change the title of todo of given user with new title',function(){
      userRegistry.addNewUser('joy');
      let todoId=userRegistry.addNewTodo('joy',{title:'first todo'});
      userRegistry.editTodoTitle('joy',todoId,'edited todo');
      let actual = userRegistry.getUser('joy')._todos;
      let expected = {[todoId]:new Todo(0,'edited todo')}
      assert.deepEqual(actual,expected);
    })
  })
  describe('addTodoItem',function(){
    it('should add an todo item to specified user',function(){
      userRegistry.addNewUser('pragya');
      let todoId=userRegistry.addNewTodo('pragya',{title:'testingTodo'});
      let taskId=userRegistry.addTodoItem('pragya',[todoId],'item1');
      let actual = userRegistry.getUserTodos('pragya');
      let expected = new Todo(0,'testingTodo');
      expected.addItem('item1');
      assert.deepEqual(actual,{[todoId]:expected})
    })
  })
})
