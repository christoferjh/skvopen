(function(app) {
    app.SkvopenModule =
    ng.core.NgModule({
        imports: [ ng.platformBrowser.BrowserModule ],
        declarations: [ app.SkvopenComponent ],
        bootstrap: [ app.SkvopenComponent ]
    })
.Class({
    constructor: function() {}
});
})(window.app || (window.app = {}));
