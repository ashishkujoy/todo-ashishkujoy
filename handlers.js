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
  let sessionid = new Date().getTime();
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
  console.log(`user is ${user}`);
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

const handleGetUserDetails = function(session,archivist,req,res) {
  let sessionid = req.cookies.sessionid;
  let username = session[sessionid];
  if(lib.isUserIsNotLoggedIn(req,session)){
    responseWithNotFound(res);
    return;
  }
  let user = archivist.getUser(username);
  let userDetails = lib.getUserDetails(user);
  res.statusCode = 200;
  res.setHeader('Content-Type','text/JSON')
  res.write(JSON.stringify(userDetails));
  res.end()
}
exports.handleGetUserDetails=handleGetUserDetails

const handleGetTodoDetailReq = function(session,archivist,req,res){
  let sessionid = req.cookies.sessionid;
  let todoTitle = req.body.title;
  let username = session[sessionid];
  let todo = archivist.getUser(username).getTodo(todoTitle);
  let todoDetail = lib.getTodoDetails(todo);
  res.statusCode = 200;
  res.setHeader('Content-Type','text/JSON')
  res.write(JSON.stringify(todoDetail));
  res.end()
}
exports.handleGetTodoDetailReq=handleGetTodoDetailReq;
