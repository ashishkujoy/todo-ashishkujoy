const Todo = require('./todo.js');
const fs = require('fs');

const Archivist = function(storagePath){
  this._storagePath = storagePath;
  this._registeredUsers = {};
}


Archivist.prototype = {
  load:function(){
    try{
      let fileContents = fs.readFileSync(this._storagePath,'utf8');
      this._registeredUsers = JSON.parse(fileContents);
      console.console.log(this._registeredUsers);
    }catch(error){
      return;
    }
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
  },
  addNewUser:function(username){
    this._registeredUsers[username]={};
  }
}
module.exports = Archivist;
