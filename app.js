const WebApp = require('./webapp');
const fs = require('fs');
const handler = require('./handlers.js');
const lib = require('./lib.js');
const Users = require('./appModules/users.js');

const users = new Users('./appTestData.js');
users.load();
users.addNewUser('arvind');
users.addNewUser('ashish');
console.log(users);
/*============================================================================*/
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
  fs.appendFile('./log.json',logs,()=>{});
}
/*============================================================================*/
let app = WebApp.create();
let userpage = fs.readFileSync('./public/userpage.html',"utf8");
let session = {'123456':'arvind'};
let registeredUsers = ['arvind','ashish']
/*-------------------------------------------------------------------------*/
const userNotRegistered = function(username,registeredUsers){
  return !registeredUsers.includes(username);
}


/*-------------------------------------------------------------------------*/
app.get('/',(req,res)=>{
  res.redirect('/index.html');
})

app.get('/userpage',(req,res)=>{
  if(lib.isUserIsNotLoggedIn(req,session)){
    res.redirect('/login.html');
  }
  res.statusCode= 200;
  res.setHeader('Content-Type','text/html');
  res.write(userpage);
  res.end();
})

app.usePostProcess((req,res)=>{
  handler.processStaticFileRequest(fs,req,res);
});

app.post('/login',(req,res)=>{
  let username = req.body.username;
  if(userNotRegistered(username,registeredUsers)){
    res.setHeader('Set-Cookie','loginFailed=true; Max-Age=4');
    res.redirect('/login');
    return;
  }
  let sessionid = 1996117;
  session[sessionid]=username;
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  res.redirect('/userpage');
  return;
})

app.post('/addNewTodo',(req,res)=>{
  if(lib.isUserIsNotLoggedIn(req,session)){
    res.redirect('/login.html');
    return;
  }
  let sessionid = req.cookies.sessionid;
  let user = session[sessionid];
  console.log(user);
  let todoDetail = req.body;
  console.log(todoDetail);
  users.addNewTodo(user,todoDetail);
  res.redirect('/userpage');
  return;
})


module.exports = app;
