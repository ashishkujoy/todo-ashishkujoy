const isUserIsNotLoggedIn = function(req,session){
  let sessionid = req.cookies.sessionid;
  return !(sessionid in session);
}
exports.isUserIsNotLoggedIn=isUserIsNotLoggedIn;


const userNotRegistered = function(username,registeredUsers){
  return !registeredUsers.includes(username);
}
exports.userNotRegistered=userNotRegistered;
