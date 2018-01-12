const Item = function(title) {
  this._title = title;
  this._done = false;
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
  isNotDone:function(){
    return this._done;
  },
  getTitle:function(){
    return this._title;
  },
  changeTitle:function(newTitle){
    this._title = newTitle;
  }
}

module.exports = Item;
