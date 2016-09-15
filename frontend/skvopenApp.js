angular.module('skvopenApp', [])

.constant('skvopenConfig', {url: 'http://skv-dev.chjh.eu/001/livskvalitet'})
.controller('skvopenController', function($scope, skvopenService) {

    var map, kmlLayer;

    $scope.nuvarandekommun = '';
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

            if ($scope.nuvarandekommun === '')
            {
                $scope.nuvarandekommun = kommun;
            }
            else
            {
                $scope.flyttKommun = kommun;
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

        var nuvarandekommun = $scope.nuvarandekommun;
        var flyttKommun = $scope.flyttKommun;
        var lon = $scope.lon;

        skvopenService.beraknaHamburgare(nuvarandekommun, flyttKommun, lon, function(response) {
            $scope.$apply(function() {
                console.log(response);
                $scope.hamburgarePerKommun[flyttKommun] = response.data; 
            });
        });
    };

    $scope.aterstall = function() {
        $scope.nuvarandekommun = '';
        $scope.hamburgarePerKommun = {};
    }
})

.factory('skvopenService', function($http, skvopenConfig) {
    return {
        beraknaHamburgare: function(nuvarandekommun, flyttKommun, lon, callback) {

            var url = skvopenConfig.url;
            var config = { params: { nuvarandekommun: nuvarandekommun.toUpperCase(), flyttKommun: flyttKommun.toUpperCase(), lon: lon }};

            $http.get(url, config).then(callback, function() {
                console.log('fel');
            });
        }
    };
});
