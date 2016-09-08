var express = require('express');
var app = express();
app.use('/bower_components', express.static('bower_components'));
app.use('/node_modules', express.static('node_modules'));
app.use('/frontend', express.static('frontend'));

require('./routes')(app);

app.listen(8080);
