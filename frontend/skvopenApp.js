angular.module('skvopenApp', [])

.constant('skvopenConfig', {url: 'http://asdf'})

.controller('skvopenController', function($scope, skvopenService, $q) {

    var map;

    $scope.initMap = function() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 63, lng: 17},
          zoom: 4
        });
      }

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
