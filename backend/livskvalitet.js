module.exports = function(app, skvopenEndpoint, hamburgareEndpoint) {

    var unirest = require('unirest');

    app.get('/livskvalitet', function(req, res) {

        var forsamling = req.params.forsamling;
        var lon = req.params.lon;

        unirest.get(skvopenEndpoint)
        .query({forsamling: forsamling})
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
