window.Analytics = Backbone.Model.extend({

    defaults: {
    	"id": null,
        "date": null,
        "date_parsed": null,
        "spent": null
    },
    
    parse: function (item) {
        item.spent = moment.duration(parseInt(item.spent), 'seconds').format("hh:mm:ss", { trim: false });       
        return item;
    },

});

window.AnalyticsCollection = Backbone.Collection.extend({
    model: Analytics,
    //localStorage: new Backbone.LocalStorage("TimelogCollection"),
    
    sortAttribute: "date",
    sortDirection: -1,
    
    sortAnalytics: function () {
    	this.sort();
    },
    
    comparator: function(a, b) {
    	var a = a.get(this.sortAttribute),
    		b = b.get(this.sortAttribute);
    	if (a == b) return 0;
    	if (this.sortDirection == 1) {
    		return a > b ? 1 : -1;
    	} else {
    		return a < b ? 1 : -1;
    	}
    },

    getByDate: function(date) {
    	return this.find(function(model) { return model.get('date') == date; });
    }
});
