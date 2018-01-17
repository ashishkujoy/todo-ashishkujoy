const isUserIsNotLoggedIn = function(req){
  let sessionid = req.cookies.sessionid;
  return !(sessionid in req.session);
}
exports.isUserIsNotLoggedIn=isUserIsNotLoggedIn;

const userNotRegistered = function(username,registeredUsers){
  return !registeredUsers.includes(username);
}
exports.userNotRegistered=userNotRegistered;

const getUserDetails = function(user){
  let username = user.getName();
  let todos = Object.keys(user.getAllTodo());
  let details = {
    username:username,
    todos:todos
  }
  return details;
}
exports.getUserDetails = getUserDetails;

const getTodoDetails = function(todo){
  let todoDetail = {};
  todoDetail.title = todo.getTitle();
  todoDetail.description = todo.getDescription();
  todoDetail.items = Object.keys(todo.getAllItems());
  return todoDetail;
}
exports.getTodoDetails = getTodoDetails;

const dynamicUrlRouter = function(url){
  urlContents = url.slice(1).split('/');
  let urlRouter = {};
  for(let index=0;index<urlContents.length;index+=2){
    urlRouter[urlContents[index]]=urlContents[index+1];
  }
  return urlRouter;
}
exports.dynamicUrlRouter=dynamicUrlRouter;
