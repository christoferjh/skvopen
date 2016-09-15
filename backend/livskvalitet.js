module.exports = function(app, skvopenEndpoint, hamburgarmodulen) {

    var unirest = require('unirest');
    app.get('/livskvalitet', livskvalitet(req,res));
    app.get('/001/livskvalitet', livskvalitet(req,res));

    function querySKVapi(skvopenEndpoint, kommun, lon, next) {
        endPoint = skvopenEndpoint;
        endPoint += lon + "/" + kommun;
        unirest.get(endPoint)
        .query({kommun: kommun})
        .query({lon: lon})
        .end(function(response) {
                next(response);
        });
    }
}

function livskvalitet(req, res) {
        //hämta querystrings från urln
        var flyttkommun = req.query.flyttkommun;
        var lon = req.query.lon;
        var nuvarandekommun = req.query.nuvarandekommun;


        querySKVapi(skvopenEndpoint, nuvarandekommun, lon, function(responseNuvarande) {
                querySKVapi(skvopenEndpoint, flyttkommun, lon, function(responseFlytt) {
                        var pengar = responseNuvarande.body.totManad - responseFlytt.body.totManad;
                        var isBetter = pengar > 0;
                        if (!isBetter){
                        	pengar = -pengar;
                        }
                        //hambugarmodulen.omvandlaKr(pengar);
                        //res.send(responseNuvarande.body);
                        var retObj = hamburgarmodulen.omvandlaKr(pengar);
                        retObj.isBetter = isBetter;
                        res.json(retObj);
                });
        });

    }

 /* unirest.get(endPoint)
        .query({kommun: kommun})
        .query({lon: lon})
        .end(function(response) {

            //var kronor = response.kronor;
            var tot = response.body.tot;
            console.log(response.body);
            console.log("tot " + tot);
            unirest.get(hamburgareEndpoint + '/omvandla/' + tot)
            .end(function(response) {
                res.send(response.body);
            });
        });*/




