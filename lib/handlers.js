const lib = require('./lib.js');

const timeStamp = ()=>{
    let t = new Date();
    return `${t.toDateString()} ${t.toLocaleTimeString()}`;
}

const responseWithNotFound = function(res) {
  res.statusCode = 404;
  res.end();
}

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
};

let handlers ={
  logger:function(fs,req,res) {
    let logs = ['--------------------------------------------------------------',
      `${timeStamp()}`,
      `${req.method}`,
      `${req.url}`,
      `${JSON.stringify(req.headers,null,2)}`,
      ''
    ].join('\n');
    console.log(`${req.method}  ${req.url}`);
    fs.appendFile('./log.json',logs,()=>{});
  },

  deliverFile:function(fileContent,contentType,res) {
    res.setHeader('Content-Type',`${contentType}`);
    res.statusCode=200;
    res.write(fileContent);
    res.end();
  },

  processStaticFileRequest:function(fs,req,res) {
    let filePath = './public'+req.url;
    let contentType = getContentType(filePath);
    fs.readFile(filePath,function(error,fileContent){
      if(error) return responseWithNotFound(res);
      handlers.deliverFile(fileContent,contentType,res);
    })
  },

  handleLoginPostReq:function(req,res){
    let username = req.body.username;
    let user = req.userRegistry.getUser(username);
    if(!user){
      res.setHeader('Set-Cookie','loginFailed=true; Max-Age=4');
      res.redirect('/login');
      return;
    }
    let sessionid = new Date().getTime();
    req.session[sessionid]=user;
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    res.redirect('/todos');
    return;
  },

  handleAddNewTodoReq:function(req,res){
    if(!req.user){
      res.redirect('/login.html');
      return;
    }
    let todoDetail = req.body;
    req.user.addNewTodo(todoDetail.title,todoDetail.description);
    res.redirect('/todos');
    return;
  },

  handleGetLoginPageReq:function(loginPage,req,res){
    let loginFailed = req.cookies.loginFailed;
    if(loginFailed){
      loginPage = loginPage.replace('<!-- message -->','login failed');
    }
    res.setHeader('Content-Type','text/html');
    res.write(loginPage);
    res.end()
  },

  handleLogoutReq:function(req,res){
    let sessionid = req.cookies.sessionid;
    delete req.session[sessionid];
    res.setHeader('Set-Cookie',`sessionid=${sessionid}; Max-Age=0`);
    res.redirect('/login');
  },

  handleGetTodosReq:function(todos,req,res){
  //pull out these into small functions.
    if(!req.user){
      res.redirect('/login')
      return;
    }
    let todoToHTML = function(todo){
      return `<div id="${todo.getId()}">
        ${todo.getTitle()}
        <button onclick=getTodoDetail()>view</button>
      </div>`
    }
    let titles = req.user.mapTodos(todoToHTML).join('\n')
    todos = todos.replace('USERNAME',req.user.getName());
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html')
    res.write(todos.replace('PUT TODOS TITLES HERE',titles));
    res.end()
  },

  handleGetTodoDetailReq:function(session,archivist,req,res){
    let sessionid = req.cookies.sessionid;
    let todoTitle = req.body.title;
    let username = session[sessionid];
    let todo = archivist.getUser(username).getTodo(todoTitle);
    let todoDetail = lib.getTodoDetails(todo);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/JSON')
    res.write(JSON.stringify(todoDetail));
    res.end()
  },

  handleDynamicUrl:function(req,res){
    let urlMap = lib.dynamicUrlRouter(req.url);
    debugger;
    let todoId = urlMap.todo;
    if(todoId){

      let contentOfTodo = getTodoContentInHtml(req.user.getTodo(todoId));
      handlers.deliverFile(JSON.stringify(contentOfTodo),'application/json',res);
    }
    debugger;
  }
}

const getTodoContentInHtml = function(todo){
  let title = `<div id='${todo.getId()}'>
    ${todo.getTitle()} <button onclick=editTitle()>edit</button>
    </div>`;
  let description = `<div>
    ${todo.getDescription()} <button onclick=editDescription()>edit</button>
    </div>`;
  let itemToHtml = (item)=> `<div id=${item.getId()}>${item.getTitle()}</div>`;
  let items = todo.mapItems(itemToHtml).join('<br>');
  return {
    title:title,
    description:description,
    items:items
  }
}

module.exports = handlers;
