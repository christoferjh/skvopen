module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendFile('frontend/index.html', {root:'.'});
    });
}
