module.exports = function(app) {

    
    
    app.get('/omvandla/:kr', function(req, res) {
        //var vara = req.params.vara;
        var kr = req.params.kr;
        //var vara = "sodaburk";
        
        //var resObj = {};
        //resObj["omvandlat"] = "true";
        //resObj.kr = kr;
        //resObj.antalvaror = skapaFullstandingOmvandling(kr);
        
        res.json(omvandlaKr(kr));
    });
    
    app.get('omvandalEnVara/:vara/:kr', function(req, res) {
        var vara = req.params.vara;
        var kr = req.params.kr;
        
        //var resObj = {};
        //resObj["omvandlat"] = "true";
        //resObj.vara = varoPris.get(vara);
        //resObj.kr = kr;
        //resObj.antalvaror = omvandlaTillVara(vara,kr);
        
        res.json(omvandlaVaraKr(vara,kr));
    }); 
    var omvandlaKr = function(kr){
    	//var vara = "sodaburk";
        var resObj = {};
        resObj["omvandlat"] = "true";
        //resObj.vara = vara;
        resObj.kr = kr;
        resObj.antalvaror = skapaFullstandingOmvandling(kr);
        return resObj;
    };
    
    var omvandlaVaraKr = function(vara,kr){
    	var resObj = {};
        resObj["omvandlat"] = "true";
        resObj.vara = varoPris.get(vara);
        resObj.kr = kr;
        resObj.antalvaror = omvandlaTillVara(vara,kr);
        return resObj;
    };
    
    return {omvandlaKr:omvandlaKr, omvandlaVaraKr:omvandlaVaraKr};
    
};

var varoPris = new Map();
varoPris.set("solresa", {"pris":4000,"namn": "Solresa", "namnPlural" : "Solresor"});
varoPris.set("hamburgare", {"pris":54,"namn": "Hamburgare", "namnPlural" : "Hamburgare"});		
varoPris.set("sodaburk" , {"pris": 10,"namn": "Läskburk", "namnPlural" : "Läskburkar"});
varoPris.set("godisnapp", {"pris": 1, "namn" : "Godisnapp" , "namnPlural" : "Godisnappar" });

function skapaFullstandingOmvandling(kr){
	var tmpKr = kr;
	var res = {};
	var textRes="";
	for (var [varoNamn, vara] of varoPris) {
		//console.log("vara "+varoNamn);
		var omvandling = omvandlaTillVaraHeltal(varoNamn, tmpKr);
		if (omvandling.antalHela>0){
			tmpKr -= omvandling.kostnad;
			res[varoNamn] = {"vara" : vara,"antal": omvandling.antalHela , "kostnad" : omvandling.kostnad};
			if (omvandling.antalHela===1){
				 textRes +=" En "+vara.namn+",";
				
				}else{
				 textRes +=" "+omvandling.antalHela+" "+vara.namnPlural+",";
				
				}
		}
	}
	res.descr = textRes;
	return res;
}		
function omvandlaTillVaraHeltal(varonamn, kr){
	var vara = varoPris.get(varonamn);
	var antalHela = Math.floor(kr / vara.pris);
	var kostnad = antalHela * vara.pris;
 	var krKvar = kr - kostnad;
 	return {"krKvar" : krKvar , "kostnad" : kostnad , "antalHela" : antalHela};
}
function omvandlaTillVara(varonamn, kr){
	var vara = varoPris.get(varonamn);
	return kr/vara.pris;
}

console.log(skapaFullstandingOmvandling(5234));