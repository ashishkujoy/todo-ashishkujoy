const WebApp = require('./webapp');
const fs = require('fs');
const handler = require('./handlers.js');
const lib = require('./lib.js');
const Archivist = require('./appModules/archivist.js');

let archivist = new Archivist('./appTestData.json');
archivist.addNewUser('joy');
archivist.addNewUser('arvind');
archivist.addNewUser('pragya');
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
let userpage = fs.readFileSync('./public/userpage.html',"utf8");
let loginPage = fs.readFileSync('./public/login.html','utf8');
let addNewTodoPage = fs.readFileSync('./public/addTodoPage.html','utf8');
let session = {'123456':'arvind','199617':'joy'};
let registeredUsers = ['arvind','ashish','joy','goodman','foo']

app.use((req,res)=>{
  logger(fs,req,res);
})
app.get('/',(req,res)=>{
  res.redirect('/index.html');
})
app.get('/userpage',(req,res)=>{
  handler.handleUserpageReq(session,userpage,req,res)
})
app.usePostProcess((req,res)=>{
  handler.processStaticFileRequest(fs,req,res);
});
app.post('/login',(req,res)=>{
  handler.handleLoginPostReq(registeredUsers,session,req,res);
})
app.post('/addNewTodo',(req,res)=>{
  console.log("Archivist users are: ",archivist._registeredUsers);
  handler.handleAddNewTodoReq(archivist,session,req,res);
})
app.get('/addNewTodo',(req,res)=>{
  res.statusCode = 200;
  res.setHeader = ('Content-Type','text/html');
  res.write(addNewTodoPage);
  res.end();
})
app.get('/login.html',(req,res)=>{
  handler.handleGetLoginPageReq(loginPage,req,res)
})
app.get('/logout',(req,res)=>{
  handler.handleLogutReq(session,req,res);
})
app.get('/userDetails',(req,res)=>{
  handler.handleGetUserDetails(session,archivist,req,res);
})
app.post('/todoDetail',(req,res)=>{
  handler.handleGetTodoDetailReq(req,res);
})
app.setArchivist=(customArchivist)=>{
  archivist=customArchivist;
}
module.exports = app;
