var app = require('express')();
//https://github.com/floatdrop/express-mongo-db
var expressMongoDb = require('express-mongo-db');

var prodmodenr = process.env.PRODMODENR;
var prodmode = process.env.PRODMODE;
var appnr = process.env.APPNR
var port = prodmodenr + appnr;


var dbfuncs = require('./open-data.js');
var skattemodul = require('./skatteberakning.js');


app.use(expressMongoDb('mongodb://localhost/skvdb'));

app.get('/', function(req, res, next) {
        res.end("Welcome...");
});


app.get('/skv/', function (req, res, next) {
    var db = req.db;
    //req.db // => Db object
    var collection = db.collection('kommunalskatt');
    
    collection.find().toArray(function (err, data) {
        return res.json(data);

    });
});

app.get('/skv-api/kommun/:kommun/:forsamling', function (req, res, next) {
    var db = req.db;
    //req.db // => Db object
    //dbfuncs.getTestData(req, res ,"kommunalskatt");
    var kommun = req.params.kommun;
    var fsm = req.params.forsamling; 
    //dbfuncs.query(req, res ,"kommunalskatt", {Kommun: 'BOTKYRKA', Församling: });
    dbfuncs.query(req, res ,"kommunalskatt", {Kommun: kommun, Församling: fsm});
    //res.end(req.params.yo);
});


app.get('/skv-api/skatte/:inkomst', function (req, res, next) {
    var db = req.db;
    var inkomst = req.params.inkomst;
    console.log(inkomst);
    var inkomst = parseInt(inkomst);

    //avrunda inkomst upp först, sen kör queryn
    dbfuncs.roundUp(inkomst, function(round) {
        console.log(round);
        dbfuncs.query(req, res ,"skattetabeller", {InkomstTom : round});
    });
});


app.get('/skv-api/:inkomst/:kommun/:forsamling', function (req, res, next) {
    var kommun = req.params.kommun;
    var fsm = req.params.forsamling;
    var inkomst = req.params.inkomst;

    dbfuncs.query_db(req, res ,"kommunalskatt", {Kommun: kommun, Församling: fsm}, function(data) {
            console.log(data);
            //var j = JSON.parse(data);
            if(data.length !== 1) {
                //TODO: throw exception
            }else {
                console.log(data[0].Kommunalskatt + " " + data[0].Landstingskatt);
                var skatteprocent = (data[0].Kommunalskatt + data[0].Landstingskatt) / 100;

                var resultat = skattemodul.raknaUtSkatt(skatteprocent, inkomst);
                res.json(resultat);
            }
            
            //consoloe.log(j);
            

    });

});


app.get('/skv-api/:inkomst/:kommun', function (req, res, next) {
    var kommun = req.params.kommun;
    var inkomst = req.params.inkomst;
    console.log("Hämta skatt från kommun och inkomst");

    dbfuncs.query_db(req, res ,"kommunalskatt", {Kommun: kommun}, function(data) {
            console.log(data);
            //var j = JSON.parse(data);
            if(data.length === 0) {
                res.json();
            }else {
                console.log(data[0].Kommunalskatt + " " + data[0].Landstingskatt);
                //var skatteprocent = (data[0].Kommunalskatt + data[0].Landstingskatt) / 100;

                var resultat = skattemodul.raknaUtSkatt(data[0].Landstingskatt, data[0].Kommunalskatt, inkomst);
                res.json(resultat);
            }
            
            //consoloe.log(j);
            

    });

});



console.log("Server running at http://127.0.0.1:"+port+"/");
app.listen(port);
