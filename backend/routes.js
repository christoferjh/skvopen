module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendFile('frontend/index.html', {root:'.'});
    });

    app.get('/about', function(req, res) {
        res.sendFile('frontend/about.html', {root:'.'});
    });
    
}
