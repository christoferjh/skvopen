//var envs = require('envs');
// Load the http module to create an http server.
var http = require('http');
var prodmode = process.env.PRODMODE;
var appnr = process.env.APPNR
var port = prodmode + appnr;



// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
var url = request.url;
  response.end("Hello " + url + " World\nThis is prodmode "+prodmode + " and appnr "+appnr);
});



// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:"+port+"/");

