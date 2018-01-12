const chai = require('chai');
const assert = chai.assert;
let request = require('./requestSimulator.js');
let Item = require('../appModules/item.js');
let th = require('./testHelpers.js');

describe('Item',function(){

  describe('markDone',function(){
    it('should done status as true',function(){
      let item = new Item('hello');
      item.markDone();
      assert.isOk(item.isDone());
    })
  })
  describe('unMarkDone',function(){
    it('should done status as false',function(){
      let item = new Item('hello');
      item.markDone();
      assert.isOk(item.isDone());
      item.unMarkDone();
      assert.isNotOk(item.isDone());
    })
  })
  describe('getTitle',function(){
    it('should give title of the item',function(){
      let item = new Item('hello');
      assert.equal(item.getTitle(),'hello');
      assert.notEqual(item.getTitle(),'byebye');
    })
  })
  describe('changeTitle',function(){
    it('should change title of the item to new given title',function(){
      let item = new Item('hello');
      assert.equal(item.getTitle(),'hello');
      item.changeTitle('byebye')
      assert.equal(item.getTitle(),'byebye');
    })
  })

})
