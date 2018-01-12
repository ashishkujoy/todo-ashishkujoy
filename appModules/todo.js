const Item = require('./item.js');
const Todo = function(title,description) {
  this._title = title;
  this._description = description || '';
  this._items = {};
}

Todo.prototype = {
  addItem:function(itemTitle){
    this._items[itemTitle] = new Item(itemTitle);
  },
  deleteItem:function(itemTitle){
    delete this._items[itemTitle];
  },
  markDone:function(itemTitle){
    let item = this._items[itemTitle];
    item.markDone();
  },
  unMarkDone:function(itemTitle){
    let item = this._items[itemTitle];
    item.unMarkDone();
  },
  getItems:function(){
    return this._items;
  },
  editTitle:function(newTitle){
    this._title = newTitle;
  },
  getTitle:function(){
    return this._title;
  },
  editDescription:function(newDescription){
    this._description = newDescription;
  },
  getDescription:function(){
    return this._description;
  },
  editItemTitle:function(itemTitle,newTitle){
    let item = this._items[itemTitle];
    item.changeTitle(newTitle);
  }
}
module.exports = Todo;
