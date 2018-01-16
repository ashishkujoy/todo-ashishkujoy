const Todo = require('./todo.js');

const User = function(name){
  this._name = name;
  this._todos = {};
  this._uniqueIdCounter = 0;
}

User.prototype = {
  getName:function(){
    return this._name;
  },
  addNewTodo:function(todoTitle,description){
    this._todos[this._uniqueIdCounter]= new Todo(this._uniqueIdCounter,todoTitle,description||'');
    this._uniqueIdCounter++;
    return this._uniqueIdCounter - 1;
  },
  deleteTodo:function(todoId){
    delete this._todos[todoId];
  },
  addTodoItem:function(todoId,itemName){
    let todo = this._todos[todoId];
    return todo.addItem(itemName);
  },
  deleteTodoItem:function(todoId,itemId){
    let todo = this._todos[todoId];
    todo.deleteItem(itemId);
  },
  markItemDone:function(todoId,itemName){
    let todo = this._todos[todoId];
    todo.markDone(itemName);
  },
  unMarkItemDone:function(todoId,itemName){
    let todo = this._todos[todoId];
    todo.unMarkDone(itemName);
  },
  editTodoTitle:function(todoId,newTitle){
    let todo = this._todos[todoId];
    todo.editTitle(newTitle);
  },
  editTodoDescription:function(todoId,newDescription){
    let todo = this._todos[todoId];
    todo.editDescription(newDescription);
  },
  editTodoItemTitle:function(todoId,itemTitle,newItemTitle){
    let todo = this._todos[todoId];
    todo.editItemTitle(itemTitle,newItemTitle);
  },
  getAllTodo:function(){
    return this._todos;
  },
  getTodo:function(todoId){
    return this._todos[todoId];
  },
  getTodoDescription:function(todoId){
    return this._todos[todoId].getDescription();
  }
}

module.exports = User;
