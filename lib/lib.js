const isUserIsNotLoggedIn = function(req,session){
  let sessionid = req.cookies.sessionid;
  return !(sessionid in session);
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
