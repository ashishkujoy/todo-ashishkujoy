const Todo = require('./todo.js');
const fs = require('fs');

const Users = function(storagePath){
  this._storagePath = storagePath;
  this._registeredUsers = {};
}

Users.prototype = {
  load:function(){
    try{
      let file = fs.readFileSync(this._storagePath,'utf8');
      if(file=='') return;
      this._registeredUsers = JSON.parse(file);
    }catch(error){
      return;
    }
  },
  getUser:function(userName){
    return this._registeredUsers[userName];
  }
}
module.exports = Users;
