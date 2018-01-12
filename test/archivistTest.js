const chai = require('chai');
const assert = chai.assert;
let request = require('./requestSimulator.js');
let Archivist = require('../appModules/archivist.js');
const Todo = require('../appModules/todo.js');
let th = require('./testHelpers.js');

let archivist = new Archivist('./appTestData.json');
archivist.load();
describe('Archivist',function(){
  describe('load',function(){
    it('should load the previously stored registered archivist',function(){
      assert.deepEqual(archivist.getUser('arvind'),{});
      assert.deepEqual(archivist.getUser('ashish'),{});
      assert.deepEqual(archivist.getUser('joy'),{});

    })
  })
  describe('getUser',function(){
    it('should give the given user',function(){
      let actual = archivist.getUser('ashish');
      let expected = {};
      assert.deepEqual(actual,expected);
    })
  })
  describe('addNewTodo',function(){
    it('should add a new todo with given detail to given user todos',function(){
      let todoDetails = {title:'hello'};
      archivist.addNewTodo('ashish',todoDetails);
      let expected = {'hello':new Todo('hello')};
      assert.deepEqual(archivist.getUser('ashish'),expected);
    })
  })
  describe('deleteTodo',function(){
    it('should delete a todo of a given user',function(){
      let todoDetails = {title:'hello'};
      archivist.addNewTodo('ashish',todoDetails);
      let expected = {'hello':new Todo('hello')};
      assert.deepEqual(archivist.getUser('ashish'),expected);
      archivist.deleteTodo('ashish','hello');
      assert.deepEqual(archivist.getUser('ashish'),{});
    })
  })
  describe('editTodoTitle',function(){
    it('should change the title of todo of given user with new title',function(){
      let todoDetails = {title:'hello'};
      archivist.addNewTodo('ashish',todoDetails);
      let expected = {'hello':new Todo('hello')};
      assert.deepEqual(archivist.getUser('ashish'),expected);
      archivist.editTodoTitle('ashish','hello','byebye');
      expected = {'byebye':new Todo('byebye')};
      assert.deepEqual(archivist.getUser('ashish'),expected);
    })
  })
})
