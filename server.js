let http = require('http');
let fs = require('fs');
let app = require('./app.js');
let UserRegistry = require('./src/appModels/userRegistry.js')
let userRegistry = new UserRegistry('./appTestData.json');
let user = userRegistry.addNewUser('joy');
let dependencies = {
  fs:fs,
  session:{},
  userRegistry:userRegistry
}
app.injectDependencies(dependencies);
let server = http.createServer(app);
const PORT = 8000;
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
