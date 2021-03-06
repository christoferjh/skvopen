var express = require('express');
var app = express();

var prodmodenr = process.env.PRODMODENR;
var prodmode = process.env.PRODMODE;
var appnr = process.env.APPNR
var port = prodmodenr + appnr;


app.use('/bower_components', express.static('bower_components'));
app.use('/node_modules', express.static('node_modules'));
app.use('/frontend', express.static('frontend'));

require('./routes')(app);
hamburgarmodulen = require('./hamburgare')(app);


var skvopenEndpoint = "http://localhost:"+prodmodenr+"002/skv-api/monad/";
var hamburgareEndpoint = 'http://localhost:' + port;
require('./livskvalitet')(app, skvopenEndpoint, hamburgarmodulen);

console.log("Server running at http://127.0.0.1:"+port+"/");
app.listen(port);
