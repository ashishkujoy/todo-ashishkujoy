const chai = require('chai');
const assert = chai.assert;
let request = require('./requestSimulator.js');
let Item = require('../src/appModels/item.js');
let th = require('./testHelpers.js');

let item;
beforeEach(function(){
  item = new Item('hello',0);
})
describe('Item',function(){

  describe('markDone',function(){
    it('should done status as true',function(){
      item.markDone();
      assert.isOk(item.isDone());
    })
  })
  describe('unMarkDone',function(){
    it('should done status as false',function(){
      item.markDone();
      assert.isOk(item.isDone());
      item.unMarkDone();
      assert.isNotOk(item.isDone());
    })
  })
  describe('getTitle',function(){
    it('should give title of the item',function(){
      assert.equal(item.getTitle(),'hello');
      assert.notEqual(item.getTitle(),'byebye');
    })
  })
  describe('changeTitle',function(){
    it('should change title of the item to new given title',function(){
      assert.equal(item.getTitle(),'hello');
      item.changeTitle('byebye')
      assert.equal(item.getTitle(),'byebye');
    })
  })

})
