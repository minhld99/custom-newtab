var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("./")).listen(8080, function(){
    console.log('Server running on 8080...');
    console.log('Open in browser: http://localhost:8080/');
});
