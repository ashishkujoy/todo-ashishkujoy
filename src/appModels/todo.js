const Item = require('./item.js');
const Todo = function(id,title,description) {
  this._id = id;
  this._title = title;
  this._description = description || '';
  this._items = {};
  this._uniqueIdCounter = 0;
}

Todo.prototype = {
  addItem:function(itemTitle){
    this._items[this._uniqueIdCounter] = new Item(itemTitle,this._uniqueIdCounter);
    this._uniqueIdCounter++;
    return this._uniqueIdCounter-1;
  },
  getId:function(){
    return this._id;
  },
  deleteItem:function(itemId){
    delete this._items[itemId];
  },
  markDone:function(itemId){
    let item = this._items[itemId];
    item.markDone();
  },
  unMarkDone:function(itemId){
    let item = this._items[itemId];
    item.unMarkDone();
  },
  getItem:function(itemId){
    return this._items[itemId];
  },
  getAllItems:function(){
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
  editItemTitle:function(itemId,newTitle){
    let item = this._items[itemId];
    item.changeTitle(newTitle);
  },
  mapItems:function(mapper){
    let items = Object.values(this._items);
    return items.map(mapper);
  }
}
module.exports = Todo;
