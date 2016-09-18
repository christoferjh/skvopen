angular.module('skvopenApp', ['ngMaterial'])

.constant('skvopenConfig', {url: "/001/livskvalitet"})
.controller('skvopenController', function($scope, skvopenService, $timeout, $mdDialog) {

    var map, kmlLayer, markers = [];

    $scope.nuvarandekommun = '';
    $scope.varorPerKommun = {};
    $scope.merInfo = {};

    $scope.initMap = function() {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 63, lng: 17},
            zoom: 6
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

        skvopenService.beraknaVaror(nuvarandekommun, flyttkommun, lon, function(response) {

            var data = response.data;


            $timeout(function() {
                $scope.visaMerInfo(data);
                $scope.varorPerKommun[flyttkommun] = data;
            }, 0);
        });
    };

    $scope.aterstall = function() {
        $scope.nuvarandekommun = '';
        $scope.varorPerKommun = {};
        $scope.flyttkommun = '';
        $scope.merInfo = {};

        markers.forEach(function(marker) {
            marker.setMap(null);
        });
    };

   $scope.fragaOmLon = function(ev) {
    var confirm = $mdDialog.prompt()
      .title('Vänligen skriv in din månadslön')
      .textContent('Lönen används för att beräkna livskvalitet beroende på kommun')
      .initialValue('25000')
      .ok('Spara');

    $mdDialog.show(confirm).then(function(result) {
      $scope.lon = result;
    }, function() { });
  }; 

   $scope.visaMerInfo = function(data) {
       var html = "<div>";
       html +="<table>";
       html +="<tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>";
       html +="<tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>";
       html +="<tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>";
       html +="<tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>";
       html +="<tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>";
       html +="</table>";
       html +="<div>";
       $scope.merInfo = data;
   };
})

.factory('skvopenService', function($http, skvopenConfig) {
    return {
        beraknaVaror: function(nuvarandekommun, flyttkommun, lon, callback) {

            var url = skvopenConfig.url;
            var config = { params: { nuvarandekommun: nuvarandekommun.toUpperCase(), flyttkommun: flyttkommun.toUpperCase(), lon: lon }};

            $http.get(url, config).then(callback, function() {
                console.log('fel');
            });
        }
    };
});
