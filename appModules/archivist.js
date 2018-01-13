const Todo = require('./todo.js');
const User = require('./user.js');
const fs = require('fs');

const Archivist = function(storagePath){
  this._storagePath = storagePath;
  this._registeredUsers = {};
}


Archivist.prototype = {
  getUser:function(userName){
    return this._registeredUsers[userName];
  },
  addNewTodo:function(userName,todoDetail){
    let user = this._registeredUsers[userName];
    user.addNewTodo(todoDetail.title,todoDetail.description||'');
  },
  deleteTodo:function(username,todoTitle){
    let user = this._registeredUsers[username];
    user.deleteTodo(todoTitle);
  },
  addTodoItem:function(userName,todoTitle,itemTitle){
    let user = this._registeredUsers[userName];
    user.addTodoItem(todoTitle,itemTitle);
  },
  editTodoTitle:function(username,oldTitle,newTitle){
    let user = this._registeredUsers[username];
    user.editTodoTitle(oldTitle,newTitle);
  },
  editTodoDescription:function(username,newDescription){
    let user = this._registeredUsers[username];
    let todo = user[oldTitle];
    todo.editDescription(newDescription);
  },
  addNewUser:function(username){
    this._registeredUsers[username]=new User(username);
  },
  markTodoItemDone:function(username,todoTitle,itemTitle){
    let user = this._registeredUsers[username];
    user.markItemDone(todoTitle,itemTitle);
  },
  getUserTodos:function(username){
    return this._registeredUsers[username].getAllTodo();
  }
}
module.exports = Archivist;
