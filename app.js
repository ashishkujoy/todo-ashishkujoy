const WebApp = require('./webapp');
const fs = require('fs');
const handler = require('./lib/handlers.js');
const UserRegistry = require('./src/appModels/userRegistry.js');

let userRegistry = new UserRegistry('./appTestData.json');
userRegistry.addNewUser('joy');
userRegistry.addNewUser('arvind');
userRegistry.addNewUser('pragya');
const timeStamp = ()=>{
    let t = new Date();
    return `${t.toDateString()} ${t.toLocaleTimeString()}`;
  }

const logger = function(fs,req,res) {
  let logs = ['--------------------------------------------------------------',
    `${timeStamp()}`,
    `${req.method}`,
    `${req.url}`,
    `${JSON.stringify(req.headers,null,2)}`,
    ''
  ].join('\n');
  console.log(`${req.method}  ${req.url}`);
  fs.appendFile('./log.json',logs,()=>{});
}
let app = WebApp.create();
let loginPage = fs.readFileSync('./templates/loginPage','utf8');
let todos = fs.readFileSync('./templates/todos','utf8')
let addNewTodoPage = fs.readFileSync('./public/addNewTodo.html','utf8');
let session = {'123456':'arvind','199617':'joy'};
let registeredUsers = ['arvind','ashish','joy','goodman','foo']

app.use((req,res)=>{
  logger(fs,req,res);
})
app.get('/',(req,res)=>{
  res.statusCode=200;
  res.setHeader('Content-Type','text/html');
  res.write(loginPage);
  res.end();
})
app.get('/login',(req,res)=>{
  handler.handleGetLoginPageReq(loginPage,req,res)
})
app.post('/login',(req,res)=>{
  handler.handleLoginPostReq(registeredUsers,session,req,res);
})
app.get('/todos',(req,res)=>{
  handler.handleGetTodosReq(session,userRegistry,todos,req,res);
})
app.post('/addNewTodo',(req,res)=>{
  handler.handleAddNewTodoReq(userRegistry,session,req,res);
})
app.get('/todos/getTodoDetail',(req,res)=>{
  handler.handleGetTodoDetail(req,res);
})
app.get('/logout',(req,res)=>{
  handler.handleLogoutReq(session,req,res);
})
app.get('/userDetails',(req,res)=>{
  handler.handleGetUserDetails(session,userRegistry,req,res);
})
app.post('/todoDetail',(req,res)=>{
  //change the name of handler.
  //handler.handleGetTodoDetailReq(session,userRegistry,req,res);
  console.log(req.body);
  res.end()
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
