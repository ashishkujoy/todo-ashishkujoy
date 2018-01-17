let fs = require('fs');
let request = require('./requestSimulator.js');
let app = require('../app.js');
let UserRegistry=require('../src/appModels/userRegistry.js');
let th = require('./testHelpers.js');
app.initialze

describe('app',function(){
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        th.status_is_not_found(res);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('should give login page',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'login');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    let userRegistry = new UserRegistry('./appTestData.json');
    let user=userRegistry.addNewUser('joy')
    let dependencies = {
      fs:fs,
      session:{123456:user},
      registeredUsers:['joy'],
      userRegistry:userRegistry
    }
    app.injectDependencies(dependencies);
    it('should redirect to todos page',function(done){
      request(app,{method:'POST',url:'/login',body:'username=joy'},res=>{
        th.should_be_redirected_to(res,'/todos');
        done();
      })
    })
    it('should give login failed and redirect to login page if username is invalid',function(done){
      request(app,{method:'POST',url:'/login',body:'username=badman'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('GET /todos',()=>{
    let userRegistry = new UserRegistry();
    let user = userRegistry.addNewUser('joy');
    let todoId=user.addNewTodo('this is first todo')
    let dependencies = {
      fs:fs,
      session:{1234:user},
      registeredUsers:['joy'],
      userRegistry:userRegistry
    }
    it('should redirect to login page if user is not logged in',function(done){
      app.injectDependencies(dependencies);
      request(app,{method:'GET',url:'/todos',cookies:{}},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
    it('give the todos page',(done)=>{
      app.injectDependencies(dependencies);
      request(app,{method:'GET',url:'/todos',headers:{cookie:"sessionid=1234"}},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Welcome');
        th.body_contains(res,'this is first todo');
        done();
      })
    })
  })
  describe('POST /addNewTodo',()=>{
    it('should redirect to /userpage',function(done){
      let userRegistry = new UserRegistry('./appTestData.json');
      let user = userRegistry.addNewUser('joy');
      let dependencies = {
        fs:fs,
        session:{123456:user},
        userRegistry:userRegistry
      }
      app.injectDependencies(dependencies);
      let options = {
        method:'POST',
        body:'title=todo',
        headers:{cookie:'sessionid=123456'},
        url:'/addNewTodo'
      }
      request(app,options,res=>{
        th.should_be_redirected_to(res,'/todos');
        done();
      })
    })
  });
  describe('GET /addNewTodo.html',function(){
    it('should give addNewTodo page',function(){
      let userRegistry = new UserRegistry('./appTestData.json');
      let user = userRegistry.addNewUser('joy');
      let dependencies = {
        fs:fs,
        session:{123456:user},
        userRegistry:userRegistry
      }
      app.injectDependencies(dependencies);
      request(app,{method:'GET',url:'/addNewTodo'},res=>{
        th.status_is_ok(res);
        th.body_contains('description');
        th.body_contains('logout');
        th.body_contains('/userpage');
        done();
      })
    })
  })
  describe('GET /login',function(){
    it('should give the login page',function(done){
      let options = {
        method:'GET',
        url:'/login'
      }
      request(app,options,res=>{
        th.status_is_ok(res);
        th.body_contains(res,'login');
        th.body_does_not_contain(res,'login failed');
        done()
      })
    })
    it('should give the login.html page with login failed message',function(done){
      let options = {
        method:'GET',
        url:'/login',
        headers:{cookie:'loginFailed=true; Max-Age=5'}
      }
      request(app,options,res=>{
        th.status_is_ok(res);
        th.body_contains(res,'login');
        th.body_contains(res,'login failed');
        done()
      })
    })
  })
  describe('GET /logout',function(){
    let userRegistry = new UserRegistry('./appTestData.json');
    let dependencies = {
      fs:fs,
      session:{123456:'arvind'},
      registeredUsers:['arvind'],
      userRegistry:userRegistry
    }
    app.injectDependencies(dependencies);
    it('should redirect to /login',function(done){
      request(app,{method:'GET',url:'/logout',headers:{cookies:'sessionid=123'}},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'sessionid');
        done();
      })
    })
  })
  describe('dynamic url',function(){
    describe.only('get /todo/0',function(){
      let userRegistry = new UserRegistry('./appTestData.json');
      let user=userRegistry.addNewUser('joy');
      let todoId=user.addNewTodo('this is first todo');
      let itemId = user.addTodoItem(todoId,'this is item');
      let dependencies = {
        fs:fs,
        session:{123456:user},
        userRegistry:userRegistry
      }
      app.injectDependencies(dependencies);
      it('should give the todo detail',function(done){
        request(app,{method:'GET',url:'/todo/0',headers:{cookie:'sessionid=123456'}},res=>{
          th.status_is_ok(res);
          th.body_contains(res,'this is first todo');
          th.body_contains(res,'<button onclick=editTitle()>edit</button>');
          done();
        })
      })
    })
  })
})
