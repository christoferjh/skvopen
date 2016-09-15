
describe('skvopenApp', function() {

    beforeEach(module('skvopenApp'));

    describe('controller tar in lön och församling, och presenterar hamburgare per församling', function() {

        var $controller;

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
        }));

        var scope = {};
        var skvopenService = {
            beraknaHamburgare : function(forsamling, lon, callback) {
                callback({data: 20});
            }
        };

        it('visar antal hamburgare beroende på lön och församling', function() {

            var controller = $controller('skvopenController', {$scope: scope, skvopenService: skvopenService})

            var forsamling = 'SOLNA, SOLNA';
            var lon = 123;

            scope.skicka(forsamling, lon);

            expect(scope.antalHamburgare).toBe(20);
        });
    });

    describe('service anropar backend med lön och församling, och får tillbaka antal hamburgare per föramling', function() {

        var service, $httpBackend;

        beforeEach(inject(function(_skvopenService_, _$httpBackend_) {
            service = _skvopenService_;
            $httpBackend = _$httpBackend_;
        }));

        var skvopenConfig = {
            url: 'http://asdf'
        };

        it('hämtar data', function() {

            var forsamling = 'SOLNA, SOLNA';
            var lon = 123;
            var hamburgare;
            $httpBackend.expectGET(/.*/).respond(200, 10);

            service.beraknaHamburgare(forsamling, lon, function(response) {
                hamburgare = response.data;
            });

            $httpBackend.flush();
            expect(hamburgare).toBe(10);
        });
    });
});
