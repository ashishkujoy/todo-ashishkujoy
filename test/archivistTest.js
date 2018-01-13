const chai = require('chai');
const assert = chai.assert;
let request = require('./requestSimulator.js');
let Archivist = require('../appModules/archivist.js');
const User = require('../appModules/user.js')
const Todo = require('../appModules/todo.js');
let th = require('./testHelpers.js');
let archivist = {};
beforeEach(function(){
  archivist = new Archivist('./appTestData.json');
})
describe.only('Archivist',function(){
  describe('getUser',function(){
    it('should give the given user',function(){
      archivist.addNewUser('arvind');
      let actual = archivist.getUser('arvind');
      assert.deepEqual(actual,new User('arvind'));
    })
  })
  describe('addNewTodo',function(){
    it('should add a new todo with given detail to given user todos',function(){
      archivist.addNewUser('joy');
      archivist.addNewTodo('joy',{title:'first todo'});
      let actual = archivist.getUser('joy')._todos;
      let expected = {'first todo':new Todo('first todo')}
      assert.deepEqual(actual,expected);
    })
  })
  describe('deleteTodo',function(){
    it('should delete a todo of a given user',function(){
      archivist.addNewUser('joy');
      archivist.addNewTodo('joy',{title:'first todo'});
      let actual = archivist.getUser('joy')._todos;
      let expected = {'first todo':new Todo('first todo')}
      assert.deepEqual(actual,expected);
      archivist.deleteTodo('joy','first todo');
      actual = archivist.getUser('joy')._todos;
      assert.deepEqual(actual,{});
    })
  })
  describe('editTodoTitle',function(){
    it('should change the title of todo of given user with new title',function(){
      archivist.addNewUser('joy');
      archivist.addNewTodo('joy',{title:'first todo'});
      archivist.editTodoTitle('joy','first todo','edited todo');
      let actual = archivist.getUser('joy')._todos;
      let expected = {'edited todo':new Todo('edited todo')}
      assert.deepEqual(actual,expected);
    })
  })
  describe('addTodoItem',function(){
    it('should add an todo item to specified user',function(){
      archivist.addNewUser('pragya');
      archivist.addNewTodo('pragya',{title:'testingTodo'});
      archivist.addTodoItem('pragya','testingTodo','item1');
      let actual = archivist.getUserTodos('pragya');
      let expected = new Todo('testingTodo');
      expected.addItem('item1');
      assert.deepEqual(actual,{testingTodo:expected})
    })
  })
})
