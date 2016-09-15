var fs = require("fs");
//var envs = require('envs');
// Load the http module to create an http server.
var http = require('http');
var prodmodenr = process.env.PRODMODENR;
var prodmode = process.env.PRODMODE;
var appnr = process.env.APPNR
var port = prodmodenr + appnr;

var test = require('./skv-api/open-data.js');
var mongo = require('mongodb').MongoClient;
//var mongo = require('mongoose');



// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
var url = request.url;
var data = fs.readFileSync('README.md');
  response.end("Hello " + url + " World\nThis is prodmode "+prodmode + "("+prodmodenr+") and appnr "+appnr + " README.ms is "+data.toString());
});



// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(port);

mongo = test.connectToDataBase(mongo, "mongodb://localhost/skvdb");

// Put a friendly message on the terminal
console.log(test.lol());
console.log("Server running at http://127.0.0.1:"+port+"/");





//TO RUN : PRODMODENR=23 APPNR=000 PRODMODE=dev nodejs hello-world.js



