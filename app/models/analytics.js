window.Analytics = Backbone.Model.extend({

    defaults: {
    	"id": null,
        "date": null,
        "spent": null,
    },

});

window.AnalyticsCollection = Backbone.Collection.extend({
    model: Analytics,
    //localStorage: new Backbone.LocalStorage("TimelogCollection"),

});
