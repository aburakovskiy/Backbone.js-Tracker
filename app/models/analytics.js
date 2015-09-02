window.Analytics = Backbone.Model.extend({

    defaults: {
    	"id": null,
        "date": null,
        "spent": null,
    },
    
    parse: function (item) {
        item.spent = moment.duration(parseInt(item.spent), 'seconds').format("hh:mm:ss", { trim: false });       
        return item;
    },

});

window.AnalyticsCollection = Backbone.Collection.extend({
    model: Analytics,
    //localStorage: new Backbone.LocalStorage("TimelogCollection"),

    getByDate: function(date) {
    	return this.find(function(model) { return model.get('date') == date; });
    }
});
