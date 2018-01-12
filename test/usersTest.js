const chai = require('chai');
const assert = chai.assert;
let request = require('./requestSimulator.js');
let Users = require('../appModules/users.js');
let th = require('./testHelpers.js');

describe('loadUsers',function(){
  it('should load the stored users from testUserdData.json file',function(){
    let users = new Users("./testUsersData.json");
    let expected = {"name":"kumar"};
    users.load();
    assert.deepEqual(users.getUser('ashish'),expected);
  })
})
