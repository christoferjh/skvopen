var app = require('express')();
//https://github.com/floatdrop/express-mongo-db
var expressMongoDb = require('express-mongo-db');

app.use(expressMongoDb('mongodb://localhost/test'));

app.get('/', function (req, res, next) {
    req.db // => Db object
});
