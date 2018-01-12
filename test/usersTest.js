const chai = require('chai');
const assert = chai.assert;
let request = require('./requestSimulator.js');
let Users = require('../appModules/users.js');
const Todo = require('../appModules/todo.js');
let th = require('./testHelpers.js');

let users = new Users('./testUsersData.json');
users.load();
describe('Users',function(){
  describe('load',function(done){
    it('should load the previously stored registered users')
  })
  describe('getUser',function(){
    it('should give the given user',function(){
      let actual = users.getUser('ashish');
      let expected = {};
      assert.deepEqual(actual,expected);
    })
  })
  describe('addNewTodo',function(){
    it('should add a new todo with given detail to given user todos',function(){
      let todoDetails = {title:'hello'};
      users.addNewTodo('ashish',todoDetails);
      let expected = {'hello':new Todo('hello')};
      assert.deepEqual(users.getUser('ashish'),expected);
    })
  })
  describe('deleteTodo',function(){
    it('should delete a todo of a given user',function(){
      let todoDetails = {title:'hello'};
      users.addNewTodo('ashish',todoDetails);
      let expected = {'hello':new Todo('hello')};
      assert.deepEqual(users.getUser('ashish'),expected);
      users.deleteTodo('ashish','hello');
      assert.deepEqual(users.getUser('ashish'),{});
    })
  })
})
