const Todo = require('./todo.js');
const fs = require('fs');

const Users = function(storagePath){
  this._storagePath = storagePath;
  this._registeredUsers = {"ashish":{}};
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
  }
}
module.exports = Users;
