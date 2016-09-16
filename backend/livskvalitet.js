module.exports = function(app, skvopenEndpoint, hamburgarmodulen) {

    var unirest = require('unirest');
    app.get('/001/livskvalitet', function(req, res) {
    	res.redirect('/livskvalitet');
	});
	
	app.get('/skatt', function(req, res) {
		//Ska resultera skatt
	   //var kommun = req.query.kommun;

	});
	
    app.get('/livskvalitet', function(req, res) {
        //hämta querystrings från urln
        var flyttkommun = req.query.flyttkommun;
        var lon = req.query.lon;
        var nuvarandekommun = req.query.nuvarandekommun;


        querySKVapi(skvopenEndpoint, nuvarandekommun, lon, function(responseNuvarande) {
                querySKVapi(skvopenEndpoint, flyttkommun, lon, function(responseFlytt) {
                        //var pengar = responseNuvarande.body.totManad - responseFlytt.body.totManad;
                        //var isBetter = pengar > 0;
                        //if (!isBetter){
                        	//pengar = -pengar;
                        //}
                        //hambugarmodulen.omvandlaKr(pengar);
                        //res.send(responseNuvarande.body);
                        //var retObj = hamburgarmodulen.omvandlaKr(pengar);
                        //retObj.isBetter = isBetter;
                        retObj = convert(responseFlytt, responseNuvarande);
                        res.json(retObj);
                });
        });

    });


	
    //flytt och nuvarande är json objekt
    function convert(flytt, nuvarande) {
        var diff_totManad = nuvarande.body.totManad - flytt.body.totManad;
        var isBetter = diff_totManad > 0;
        if (!isBetter){
            diff_totManad = -diff_totManad;
        }

        var data = {};

        data.nuvarandeskatt = nuvarande.body;
        data.flyttskatt = flytt.body;

        var retObj = hamburgarmodulen.omvandlaKr(diff_totManad);
        data.diff_totManad=retObj;

        var diff_Kommunalskatt = Math.abs(nuvarande.body.totkommunskatt - flytt.body.totkommunskatt);
        retObj = hamburgarmodulen.omvandlaKr(diff_Kommunalskatt/12);
        data.diff_Kommunalskatt= retObj;

        var diff_Landstingsskatt = Math.abs(nuvarande.body.landstingsskatt - flytt.body.landstingsskatt);
        retObj = hamburgarmodulen.omvandlaKr(diff_Landstingsskatt/12);
        data.diff_Landstingsskatt= retObj;

        var diff_tot = Math.abs(nuvarande.body.tot - flytt.body.tot);
        retObj = hamburgarmodulen.omvandlaKr(diff_tot);
        data.diff_tot= retObj;

        data.isBetter = isBetter;

        return data;
    }

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



