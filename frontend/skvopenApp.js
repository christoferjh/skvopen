angular.module('skvopenApp', ['uiGmapgoogle-maps'])

    .constant('skvopenConfig', 
            {url: 'http://asdf'}
    )

    .controller('skvopenController', function($scope, skvopenService) {

        $scope.map = { center: { latitude: 63, longitude: 18 }, zoom: 4 };

        $scope.skicka = function(kommun, lon) {

            skvopenService.beraknaHamburgare(kommun, lon, function(response) {
                $scope.antalHamburgare = response.data; 
            });
        };
    })

    .factory('skvopenService', function($http, skvopenConfig) {
        return {
            beraknaHamburgare: function(kommun, lon, callback) {

                var url = skvopenConfig.url;
                var config = { params: { kommun: kommun, lon: lon }};

                $http.get(url, config).then(callback, function() {
                    console.log('fel');
                });
            }
        };
});
