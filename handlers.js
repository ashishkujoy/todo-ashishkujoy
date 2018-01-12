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
