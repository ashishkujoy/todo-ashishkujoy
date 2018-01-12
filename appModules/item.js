const Item = function(title) {
  this._title = title;
  this._done = false;
}

Item.prototype ={
  mark:function(){
    this._done = true;
  },
  unMark:function(){
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
