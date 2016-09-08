(function(app) {
    document.addEventListener('DOMContentLoaded', function() {
        ng.platformBrowserDynamic
        .platformBrowserDynamic()
        .bootstrapModule(app.SkvopenModule);
    });
})(window.app || (window.app = {}));
