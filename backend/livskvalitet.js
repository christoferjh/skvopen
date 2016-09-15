module.exports = function(app, skvopenEndpoint, hamburgareEndpoint) {

    var unirest = require('unirest');

    app.get('/livskvalitet', function(req, res) {

        var kommun = req.params.kommun;
        var lon = req.params.lon;

        unirest.get(skvopenEndpoint)
        .query({kommun: kommun})
        .query({lon: lon})
        .end(function(response) {

            var kronor = response.kronor;

            unirest.get(hamburgareEndpoint + '/omvandla/' + kronor)
            .end(function(response) {
                res.send(response.body);
            });
        });
    });
}
