angular.module('skvopenApp', [])

.constant('skvopenConfig', {url: 'http://asdf'})

.controller('skvopenController', function($scope, skvopenService, $q) {

    var map, kmlLayer;

    $scope.hemkommun = '';
    $scope.hamburgarePerKommun = {};

    $scope.initMap = function() {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 63, lng: 17},
            zoom: 4
        });

        kmlLayer = new google.maps.KmlLayer({
            url: 'http://chjh.eu/skv/kommuner2.kml',
                 suppressInfoWindows: true,
                 map: map,
        }); 

        kmlLayer.addListener('click', function(event) {
            var snippet = event.featureData.snippet; 
            var kommun = snippet.replace(/.*NAMN:\s/, '');

            $scope.$apply(function() { 

            if ($scope.hemkommun === '')
            {
                $scope.hemkommun = kommun;
            }
            else
            {
                $scope.tillKommun = kommun;
                $scope.skicka();
            }
            });

            var marker = new google.maps.Marker({
                position: event.latLng,
                map: map
            });
        });
    };

    $scope.skicka = function() {

        var hemkommun = $scope.hemkommun;
        var tillKommun = $scope.tillKommun;
        var lon = $scope.lon;

        skvopenService.beraknaHamburgare(hemkommun, tillKommun, lon, function(response) {
            $scope.hamburgarePerKommun[tillKommun] = response.data; 
        });
    };

    $scope.aterstall = function() {
        $scope.hemkommun = '';
        $scope.hamburgarePerKommun = {};
    }
})

.factory('skvopenService', function($http, skvopenConfig) {
    return {
        beraknaHamburgare: function(hemkommun, tillKommun, lon, callback) {

            var url = skvopenConfig.url;
            var config = { params: { hemkommun: hemkommun, tillKommun: tillKommun, lon: lon }};

            $http.get(url, config).then(callback, function() {
                console.log('fel');
            });
        }
    };
});
