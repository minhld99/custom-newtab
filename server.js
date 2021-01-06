var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("./src")).listen(8080, function(){
    console.log('Server running on 8080...');
    console.log('Open in browser: http://localhost:8080/');
});
