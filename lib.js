const isUserIsNotLoggedIn = function(req,session){
  let sessionid = req.cookies.sessionid;
  return !(sessionid in session);
}
exports.isUserIsNotLoggedIn=isUserIsNotLoggedIn;
