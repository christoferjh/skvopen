module.exports = function(app) {

    
    
    app.get('/omvandla/:kr', function(req, res) {
        //var vara = req.params.vara;
        var kr = req.params.kr;
        //var vara = "sodaburk";
        
        var resObj = {};
        resObj["omvandlat"] = "true";
        //resObj.vara = vara;
        resObj.kr = kr;
        resObj.antalvaror = skapaFullstandingOmvandling(kr);
        
        res.json(resObj);
    });
    
    app.get('/:vara/:kr', function(req, res) {
        var vara = req.params.vara;
        var kr = req.params.kr;
        
        var resObj = {};
        resObj["omvandlat"] = "true";
        resObj.vara = vara;
        resObj.kr = kr;
        resObj.antalvaror = omvandlaTillVara(vara,kr);
        
        res.json(resObj);
    });
    
    
    
    
}

var varoPrisObj = {
		"hamburgare" : {"pris":54,"namn":"Hamburgare"}, 
		"sodaburk" : {"pris": 10,"namn":"Läskburk"}, 
		"godisnapp" : {"pris": 1, "namn" : "Godisnapp"} 
		};
var varoPris = new Map();
varoPris.set("hamburgare", {"pris":54,"namn":"Hamburgare"});		
varoPris.set("sodaburk" , {"pris": 10,"namn":"Läskburk"});
varoPris.set("godisnapp", {"pris": 1, "namn" : "Godisnapp"});

function skapaFullstandingOmvandling(kr){
	var tmpKr = kr;
	var res = {};
	for (var [varoNamn, vara] of varoPris) {
		console.log("vara "+varoNamn);
		var omvandling = omvandlaTillVaraHeltal(varoNamn, tmpKr);
		if (omvandling.antalHela>0){
			tmpKr -= omvandling.kostnad;
			res[varoNamn] = {"namn" : vara.namn,"antal": omvandling.antalHela , "kostnad" : omvandling.kostnad};
			
		}
	}
	return res;
}		
function omvandlaTillVaraHeltal(varonamn, kr){
	var vara = varoPris.get(varonamn);
	var antalHela = Math.floor(kr / vara.pris);
	var kostnad = (antalHela * vara.pris);
 	var krKvar = kr - kostnad;
 	return {"krKvar" : krKvar , "kostnad" : kostnad , "antalHela" : antalHela};
}
function omvandlaTillVara(varonamn, kr){
	var vara = varoPris.get(varonamn);
	return kr/vara.pris;
}

console.log(skapaFullstandingOmvandling(1234));