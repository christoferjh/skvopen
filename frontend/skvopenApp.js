angular.module('skvopenApp', [])

    .constant('skvopenConfig', 
            {url: 'http://asdf'}
    )

    .controller('skvopenController', function($scope, skvopenService) {
        $scope.skicka = function(forsamling, lon) {

            skvopenService.beraknaHamburgare(forsamling, lon, function(response) {
                $scope.antalHamburgare = response.data; 
            });
        };
    })

    .factory('skvopenService', function($http, skvopenConfig) {
        return {
            beraknaHamburgare: function(forsamling, lon, callback) {

                var url = skvopenConfig.url;
                var config = { params: { forsamling: forsamling, lon: lon }};

                $http.get(url, config).then(callback, function() {
                    console.log('fel');
                });
            }
        };
});
