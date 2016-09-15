module.exports = {
	
	
	
	raknaUtSkatt: function(skattesats, inktax){
		
		var grundavdrag = beraknaGrundAvdrag(inktax);
		var skatt = {};
		
		skatt.grundavdrag = grundavdrag;
		inktax -= grundavdrag;
		
		var totskatt = inktax * skattesats;
		var statligSkatt = 0;
		if (inktax > 616100) { //25% statlig skatt
			statligSkatt = (inktax - 616100)*0.25;
			
		}else if (inktax > 430200) { //20% statlig skatt
			statligSkatt = (inktax - 430200)*0.2;
		}
		
		totskatt+=statligSkatt;
		
		skatt.tot = totskatt;
		skatt.statlig = statligSkatt;
		
		if (skatt.tot < 0){
			skatt.tot = 0;
		}
		skatt.totManad = totskatt / 12;
		
		return skatt;
	}
	
}

//Prisbaselopp
var PBB = 44300;

function beraknaGrundAvdrag(inktax){
	//var inktax = lon * 12;
	console.log("inktax "+ inktax);
	if (inktax > 7.88 * PBB) {
		console.log("1");
		return 0.293 * PBB;
	}else if (inktax > 3.11 * PBB) {
		console.log("2");
		return 0.77 * PBB - 0.1*(inktax - 3.11 * PBB);
	}else if (inktax > 2.72 * PBB) {
		console.log("3");
		return 0.77 * PBB;
	}else if (inktax > 0.99 * PBB) {
		console.log("4");
		return 0.423 * PBB + 0.2 * (inktax - 0.99 * PBB);
	}
	console.log("1");
	return 0.423 * PBB;
	
}

//var lon = 25000*12;

//console.log("beraknaGrundAvdrag " + beraknaGrundAvdrag(lon) );
//console.log("Rakna ut skatt ");
//console.log(module.exports.raknaUtSkatt(0.3223,lon));
 
 