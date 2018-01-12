const lib = require('./lib.js');

const responseWithNotFound = function(res) {
  res.statusCode = 404;
  res.end();
}
exports.responseWithNotFound=responseWithNotFound;


const getContentType = function(filePath) {
  let fileExtension = filePath.slice(filePath.lastIndexOf('.'));
  let contentTypes = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.png':'image/png',
    '.gif':'image/gif',
    '.jpg':'image/jpg',
    '.pdf':'application/pdf'
  }
  return contentTypes[fileExtension];
}

const deliverFile = function(fileContent,contentType,res) {
  res.setHeader('Content-Type',`${contentType}`);
  res.statusCode=200;
  res.write(fileContent);
  res.end();
}

const processStaticFileRequest = function(fs,req,res) {
  let filePath = './public'+req.url;
  let contentType = getContentType(filePath);
  fs.readFile(filePath,function(error,fileContent){
    if(error) return responseWithNotFound(res);
    deliverFile(fileContent,contentType,res);
  })
}
exports.processStaticFileRequest = processStaticFileRequest;

const handleUserpageReq = function(session,userpage,req,res){
  if(lib.isUserIsNotLoggedIn(req,session)){
    res.redirect('/login.html');
    return;
  }
  res.statusCode= 200;
  res.setHeader('Content-Type','text/html');
  res.write(userpage);
  res.end();
}
exports.handleUserpageReq=handleUserpageReq;

const handleLoginPostReq = function(registeredUsers,session,req,res){
  let username = req.body.username;
  if(lib.userNotRegistered(username,registeredUsers)){
    res.setHeader('Set-Cookie','loginFailed=true; Max-Age=4');
    res.redirect('/login.html');
    return;
  }
  let sessionid = 1996117;
  session[sessionid]=username;
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  res.redirect('/userpage');
  return;
}
exports.handleLoginPostReq=handleLoginPostReq;

const handleAddNewTodoReq = function(archivist,session,req,res){
  if(lib.isUserIsNotLoggedIn(req,session)){
    res.redirect('/login.html');
    return;
  }
  let sessionid = req.cookies.sessionid;
  let user = session[sessionid];
  let todoDetail = req.body;
  archivist.addNewTodo(user,todoDetail);
  res.redirect('/userpage');
  return;
}
exports.handleAddNewTodoReq=handleAddNewTodoReq;

const handleGetLoginPageReq = function(loginPage,req,res){
  let loginFailed = req.cookies.loginFailed;
  if(loginFailed){
    loginPage = loginPage.replace('<!-- message -->','login failed');
  }
  res.setHeader('Content-Type','text/html');
  res.write(loginPage);
  res.end()
}
exports.handleGetLoginPageReq=handleGetLoginPageReq;

const handleLogutReq = function(session,req,res){
  let sessionid = req.cookies.sessionid;
  delete session[sessionid];
  res.setHeader('Set-Cookie',`sessionid=${sessionid}; Max-Age=0`);
  res.redirect('/index.html');
}
exports.handleLogutReq = handleLogutReq;
