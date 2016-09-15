module.exports = {
	
	
	
	raknaUtSkatt: function(landstingsskattesats, kommunskattesats, inktax){
		var skatt = {};
		var grundavdrag = Math.floor(beraknaGrundAvdrag(inktax));
		skatt.jobbskatteavdrag = Math.floor(beraknaJobbskatteAvdrag(inktax,grundavdrag,kommunskattesats/100));
		
		
		skatt.grundavdrag = grundavdrag;
		inktax -= grundavdrag;
		
		//var totskatt = inktax * (landstingskattesats+kommunskattesats)/100;
		skatt.landstingsskatt	= Math.floor(inktax * landstingsskattesats/100) ; 
		skatt.kommunskatt	= Math.floor(inktax * kommunskattesats/100) ; 
		
		var statligSkatt = 0;
		if (inktax > 616100) { //25% statlig skatt
			statligSkatt = Math.floor((inktax - 616100)*0.25);
			
		}else if (inktax > 430200) { //20% statlig skatt
			statligSkatt = Math.floor((inktax - 430200)*0.2);
		}
		
		
		
		skatt.tot = Math.floor(statligSkatt + skatt.landstingsskatt + skatt.kommunskatt - skatt.jobbskatteavdrag);
		skatt.statlig = statligSkatt;
		
		if (skatt.tot < 0){
			skatt.tot = 0;
		}
		skatt.totManad = Math.floor(skatt.tot / 12);
		
		return skatt;
	}
	
}

//Prisbaselopp
var PBB = 44300;

function beraknaJobbskatteAvdrag(inktax, GA, KI){
	//GA = grundavdrag, KI = Kommunalskatt
	if (inktax > 7*PBB){
		return (1.868*PBB - GA) * KI;
	}else if (inktax > 2.72*PBB){
		return (1.461*PBB +0.095*(inktax-2.72*PBB) - GA) * KI;
	}else if (inktax > 0.91*PBB){
		return (0.91*PBB +0.304*(inktax-0.91*PBB) - GA) * KI;
	}
	return (inktax - GA) * KI;
}

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
 
 