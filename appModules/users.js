const Todo = require('./todo.js');
const fs = require('fs');

const Users = function(storagePath){
  this._storagePath = storagePath;
  this._registeredUsers = {"ashish":{},"arvind":{}};
}

Users.prototype = {
  load:function(){
    let filePath = this._storagePath;
    let users = this;
    fs.readFile(filePath,'utf8',function(error,contents){
      if(error||contents=='') return;
      user._registeredUsers = JSON.parse(contents);
    })
  },
  getUser:function(userName){
    return this._registeredUsers[userName];
  },
  addNewTodo:function(userName,todoDetail){
    let user = this._registeredUsers[userName];
    let todo = new Todo(todoDetail.title,todoDetail.description||'');
    user[todoDetail.title] = todo;
  },
  deleteTodo:function(username,todoTitle){
    let user = this._registeredUsers[username];
    delete user[todoTitle];
  },
  editTodoTitle:function(username,oldTitle,newTitle){
    let user = this._registeredUsers[username];
    let todo = user[oldTitle];
    todo.editTitle(newTitle);
    user[newTitle] = todo;
    delete user[oldTitle];
  },
  editTodoDescription:function(username,newDescription){
    let user = this._registeredUsers[username];
    let todo = user[oldTitle];
    todo.editDescription(newDescription);
  }
}
module.exports = Users;
