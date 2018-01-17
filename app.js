const WebApp = require('./webapp');
const fs = require('fs');
const handler = require('./lib/handlers.js');
const UserRegistry = require('./src/appModels/userRegistry.js');

let app = WebApp.create();
let loginPage = fs.readFileSync('./templates/loginPage','utf8');
let todos = fs.readFileSync('./templates/todos','utf8')
let addNewTodoPage = fs.readFileSync('./public/addNewTodo.html','utf8');

const loadUser = function(req,res) {
  let sessionid = req.cookies.sessionid;
  let user = req.session[sessionid];
  if(user) req.user = user;
}

app.use(loadUser);
app.use(handler.parseUrl);
app.use((req,res)=>{
  handler.logger(fs,req,res);
})
app.get('/',function(req,res){
  handler.deliverFile(loginPage,'text/html',res);
})
app.get('/login',(req,res)=>{
  handler.handleGetLoginPageReq(loginPage,req,res)
})
app.post('/login',(req,res)=>{
  handler.handleLoginPostReq(req,res);
})
app.get('/todos',(req,res)=>{
  handler.handleGetTodosReq(todos,req,res);
})
app.post('/addNewTodo',(req,res)=>{
  handler.handleAddNewTodoReq(req,res);
})
app.get('/logout',(req,res)=>{
  handler.handleLogoutReq(req,res);
})
app.get('/userDetails',(req,res)=>{
  handler.handleGetUserDetails(req,res);
})

app.setUserRegistry=(customUserRegistry)=>{
  userRegistry=customUserRegistry;
}
app.setSession = (customSession)=>{
  session = customSession;
}
app.usePostProcess((req,res)=>{
  handler.processStaticFileRequest(fs,req,res);
});

module.exports = app;
