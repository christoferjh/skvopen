module.exports = function(app) {

    
    
    app.get('/hamburgare/', function(req, res) {
        
        res.json({"hello hamburgare" : "yepp"});
    });
    
}

