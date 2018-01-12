const responseWithNotFound = function(res) {
  res.statusCode = 404;
  res.end();
}
exports.responseWithNotFound=responseWithNotFound;
