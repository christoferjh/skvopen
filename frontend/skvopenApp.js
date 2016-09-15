angular.module('skvopenApp', [])

    .constant('skvopenConfig', 
            {url: 'http://asdf'}
    )

    .controller('skvopenController', function($scope, skvopenService) {

        $scope.skicka = function(forsamling, lon) {
            
            var antalHamburgare = skvopenService.beraknaHamburgare(forsamling, lon);
            console.log(antalHamburgare);
        };
    })

    .factory('skvopenService', function($http, skvopenConfig) {
        return {
            beraknaHamburgare: function(forsamling, lon) {
                return {};
            }
        };
});
