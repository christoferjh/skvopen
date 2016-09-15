module.exports = function(app) {

    
    
    app.get('/hamburgare/krtillburgare/:kr', function(req, res) {
        
        res.json({"hello hamburgare" : "yepp"});
    });
    
}

