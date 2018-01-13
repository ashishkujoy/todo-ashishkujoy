let request = require('./requestSimulator.js');
let app = require('../app.js');
let Archivist=require('../appModules/archivist.js');
let th = require('./testHelpers.js');


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
    it('redirects to index.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/index.html');
        th.body_contains(res,'');
        done();
      })
    })
  })
  describe('GET /index.html',()=>{
    it('gives the index page',(done)=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'TODO APP');
        done();
      })
    })
  })
  describe('GET /userpage',()=>{
    it('should redirect to login page if user is not logged in',function(done){
      request(app,{method:'GET',url:'/userpage',cookies:{}},res=>{
        th.should_be_redirected_to(res,'/login.html');
        done();
      })
    })
    it('give the userpage',(done)=>{
      request(app,{method:'GET',url:'/userpage',headers:{cookie:"sessionid=123456"}},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'user page');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('should redirect to userpage',function(done){
      request(app,{method:'POST',url:'/login',body:'username=ashish'},res=>{
        th.should_be_redirected_to(res,'/userpage');
        done();
      })
    })
    it('should give login failed and redirect to login page if username is invalid',function(done){
      request(app,{method:'POST',url:'/login',body:'username=badman'},res=>{
        th.should_be_redirected_to(res,'/login.html');
        done();
      })
    })
  })
  describe('POST /addNewTodo',()=>{
    it('should redirect to /userpage',function(done){
      let archivist=new Archivist();
      archivist.addNewUser("arvind");
      app.setArchivist(archivist);
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
  describe('GET /login.html',function(){
    it('should give the login.html page',function(done){
      let options = {
        method:'GET',
        url:'/login.html'
      }
      request(app,options,res=>{
        th.status_is_ok(res);
        th.body_contains(res,'login page');
        th.body_does_not_contain(res,'login failed');
        done()
      })
    })
    it('should give the login.html page with login failed message',function(done){
      let options = {
        method:'GET',
        url:'/login.html',
        headers:{cookie:'loginFailed=true; Max-Age=5'}
      }
      request(app,options,res=>{
        th.status_is_ok(res);
        th.body_contains(res,'login page');
        th.body_contains(res,'login failed');
        done()
      })
    })
  })
  describe('GET /logout',function(){
    it('should redirect to /index.html',function(done){
      request(app,{method:'GET',url:'/logout',headers:{cookies:'sessionid=123'}},res=>{
        th.should_be_redirected_to(res,'/index.html');
        th.should_have_expiring_cookie(res,'sessionid');
        done();
      })
    })
  })
  describe('GET /userDetails',function(){
    it('should give userDetails',function(done){
      let archivist=new Archivist();
      archivist.addNewUser("joy");
      archivist.addNewTodo('joy',{title:'testing get user'});
      app.setArchivist(archivist);
      let options ={
        method:'GET',
        url:'/userDetails',
        headers:{cookie:'sessionid=199617'}
      }
      request(app,options,res=>{
        th.status_is_ok(res);
        th.body_contains(res,'testing get user')
        console.log(res.body);
        done();
      })
    })
    it('should give userDetails',function(done){
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
})
