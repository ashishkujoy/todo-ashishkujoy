const Item = function(title,id) {
  this._title = title;
  this._done = false;
  this._id = id;
}

Item.prototype ={
  markDone:function(){
    this._done = true;
  },
  unMarkDone:function(){
    this._done = false;
  },
  isDone:function(){
    return this._done;
  },
  getTitle:function(){
    return this._title;
  },
  changeTitle:function(newTitle){
    this._title = newTitle;
  },
  getId:function(){
    return this._id;
  }
}

module.exports = Item;
