const WebApp = require('./webapp');
const fs = require('fs');
const handler = require('./handlers.js');
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

app.get('/',(req,res)=>{
  res.redirect('/index.html');
})

app.get('/userpage',(req,res)=>{
  let userpage = fs.readFileSync('./public/userpage.html','utf8');
  res.statusCode= 200;
  res.setHeader('Content-Type','text/html');
  res.write(userpage);
  res.end();
})

app.usePostProcess((req,res)=>{
  handler.processStaticFileRequest(fs,req,res);
});

module.exports = app;
