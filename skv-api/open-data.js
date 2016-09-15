
module.exports = {

    lol: function() {
        return "hej";
    },


	handleQuestion: function(req, res){
		
		
		},

    connectToDataBase: function(mongoclient, mongoURI) {
        mongoclient.connect(mongoURI, function(err, db) {
            if(err) { return console.log(err);}
            
            console.log("Connected to DB!");
            //return mongoclient;
            return db;   
        })
    }

    
    getKommunalSkattForKommun : function(mongoclient,kommunNamn) {
        var kommunalskatt_collection = mongoclient.collection('kommunalskatt');
        kommunalskatt_collection.find()

    }


}
