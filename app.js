const WebApp = require('./webapp');
const fs = require('fs');
const handler = require('./handlers.js');
const lib = require('./lib.js');
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
let session = {'123456':'arvind'}

app.get('/',(req,res)=>{
  res.redirect('/index.html');
})

app.get('/userpage',(req,res)=>{
  if(lib.isUserIsNotLoggedIn(req,session)){
    console.log(req.cookies);
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
  let sessionid = 1996117;
  session[sessionid]=username;
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  res.redirect('/userpage');
  return;
})
module.exports = app;
