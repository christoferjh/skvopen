
getCollection = function(req, collectionName) {
     console.log("getCollection");
     db = req.db;
     var collection = db.collection(collectionName);
     return collection;
}

module.exports = {

    lol: function() {
        console.log("hejsan");
    },

  roundUp: function(tal, next) {
      var round = Math.floor((tal + 99) / 100) * 100;
      return next(round);
  }, 
    
	getTestData: function(req, res,collectionName) {
       //hämta tabellen
       collection = getCollection(req, collectionName);
       //hämta alla data -> spara det i en array
       collection.find({Kommun: 'BOTKYRKA'}).toArray(function (err, data) {
            return res.json(data); //skicka datat som json
        });
    }, 

    query: function(req, res,collectionName, query) {
       //hämta tabellen
       collection = getCollection(req, collectionName);
       //hämta alla data -> spara det i en array
       collection.find(query).toArray(function (err, data) {
            res.json(data); //skicka datat som json
        });
    },

    query_db: function(req, res, collectionName, query, next) {
       //hämta tabellen
       collection = getCollection(req, collectionName);
       //hämta alla data -> spara det i en array
       collection.find(query).toArray(function (err, data) {
             next(data); //skicka datat
        });
    }


}
