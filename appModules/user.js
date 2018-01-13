const Todo = require('./todo.js');

const User = function(name){
  this._name = name;
  this._todos = {};
}

User.prototype = {
  getName:function(){
    return this._name;
  },
  addNewTodo:function(todoTitle,description){
    this._todos[todoTitle]= new Todo(todoTitle,description||'');
  },
  deleteTodo:function(todoTitle){
    delete this._todos[todoTitle];
  },
  addTodoItem:function(todoTitle,itemName){
    let todo = this._todos[todoTitle];
    todo.addItem(itemName);
  },
  deleteTodoItem:function(todoTitle,itemName){
    let todo = this._todos[todoTitle];
    todo.deleteItem(itemName);
  },
  markItemDone:function(todoTitle,itemName){
    let todo = this._todos[todoTitle];
    todo.markDone(itemName);
  },
  unMarkItemDone:function(todoTitle,itemName){
    let todo = this._todos[todoTitle];
    todo.unMarkDone(itemName);
  },
  editTodoTitle:function(todoTitle,newTitle){
    let todo = this._todos[todoTitle];
    let newTodo = todo;
    newTodo.editTitle(newTitle);
    this._todos[newTitle]=newTodo;
    delete this._todos[todoTitle];
  },
  editTodoDescription:function(todoTitle,newDescription){
    let todo = this._todos[todoTitle];
    todo.editDescription(newDescription);
  },
  editTodoItemTitle:function(todoTitle,itemTitle,newItemTitle){
    let todo = this._todos[todoTitle];
    todo.editItemTitle(itemTitle,newItemTitle);
  },
  getAllTodo:function(){
    return this._todos;
  },
  getTodo:function(todoTitle){
    return this._todos[todoTitle];
  },
  getTodoDescription:function(todoTitle){
    return this._todos[todoTitle].getDescription();
  }
}

module.exports = User;
