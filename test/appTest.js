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
  describe('GET /todos',()=>{
    it('should redirect to login page if user is not logged in',function(done){
      request(app,{method:'GET',url:'/todos',cookies:{}},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
    it('give the todos page',(done)=>{
      request(app,{method:'GET',url:'/todos',headers:{cookie:"sessionid=123456"}},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Welcome');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('should redirect to todos page',function(done){
      request(app,{method:'POST',url:'/login',body:'username=ashish'},res=>{
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
  describe.skip('POST /addNewTodo',()=>{
    it('should redirect to /userpage',function(done){
      let archivist=new UserRegistry();
      archivist.addNewUser("arvind");
      app.setUserRegistry(archivist);
      let options = {
        method:'POST',
        body:'title=todo',
        headers:{cookie:'sessionid=123456'},
        url:'/addNewTodo'
      }
      request(app,options,res=>{
        th.should_be_redirected_to(res,'/userpage');
        done();
      })
    })
  });
  describe.skip('GET /addNewTodo.html',function(){
    it('should give addNewTodo page',function(){
      let archivist=new UserRegistry();
      archivist.addNewUser("arvind");
      app.setUserRegistry(archivist);
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
    it('should redirect to /login',function(done){
      request(app,{method:'GET',url:'/logout',headers:{cookies:'sessionid=123'}},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'sessionid');
        done();
      })
    })
  })
  describe.skip('GET /userDetails',function(){
    it('should give userDetails',function(done){
      let archivist=new UserRegistry();
      archivist.addNewUser("joy");
      archivist.addNewTodo('joy',{title:'testing get user'});
      app.setUserRegistry(archivist);
      let options ={
        method:'GET',
        url:'/userDetails',
        headers:{cookie:'sessionid=199617'}
      }
      request(app,options,res=>{
        th.status_is_ok(res);
        th.body_contains(res,'testing get user')
        done();
      })
    })
    it('should give not found',function(done){
      let options ={
        method:'GET',
        url:'/userDetails'
      }
      request(app,options,res=>{
        th.status_is_not_found(res);
        done();
      })
    })
  })
  describe.skip('POST /todoDetail',function(){
    it('should give the details of specified todo of logged in user',function(done){
      let options = {
        method:'POST',
        url:'/todoDetail',
        body:'title=firstTodo',
        headers:{cookie:'sessionid=199617'}
      }
      let archivist=new UserRegistry();
      archivist.addNewUser("joy");
      archivist.addNewTodo('joy',{title:'firstTodo'});
      archivist.addTodoItem('joy','firstTodo','testing it');
      app.setUserRegistry(archivist);
      app.setSession({199617:'joy'});
      request(app,options,res=>{
        th.status_is_ok(res);
        th.body_contains(res,'testing it')
        done();
      })
    })
  })
})
