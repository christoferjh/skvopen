angular.module('skvopenApp', [])

.constant('skvopenConfig', {url: "/livskvalitet"})
.controller('skvopenController', function($scope, skvopenService, $timeout) {

    var map, kmlLayer, markers = [];

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
                $scope.flyttkommun = kommun;
                $scope.skicka();
            }
            });


            var icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            if ($scope.flyttkommun)
            {
                icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }

            var marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                icon: icon
            });

            markers.push(marker);
        });
    };

    $scope.skicka = function() {

        var nuvarandekommun = $scope.nuvarandekommun;
        var flyttkommun = $scope.flyttkommun;
        var lon = $scope.lon;

        skvopenService.beraknaHamburgare(nuvarandekommun, flyttkommun, lon, function(response) {

            var hamburgare = response.data.antalvaror.hamburgare.antal;
            var isBetter = response.data.isBetter;

            if (!isBetter)
            {
                hamburgare = '-' + hamburgare;
            }

            $timeout(function() {
                $scope.hamburgarePerKommun[flyttkommun] = hamburgare; 
            }, 0);
        });
    };

    $scope.aterstall = function() {
        $scope.nuvarandekommun = '';
        $scope.hamburgarePerKommun = {};

        markers.forEach(function(marker) {
            marker.setMap(null);
        });
    }
})

.factory('skvopenService', function($http, skvopenConfig) {
    return {
        beraknaHamburgare: function(nuvarandekommun, flyttkommun, lon, callback) {

            var url = skvopenConfig.url;
            var config = { params: { nuvarandekommun: nuvarandekommun.toUpperCase(), flyttkommun: flyttkommun.toUpperCase(), lon: lon }};

            $http.get(url, config).then(callback, function() {
                console.log('fel');
            });
        }
    };
});
