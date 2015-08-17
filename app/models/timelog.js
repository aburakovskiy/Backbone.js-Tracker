window.Timelog = Backbone.Model.extend({
    defaults: {
    	"id": null,
        "start_time": null,
        "spent": null,
        "name": "",
        "description": ""
    },
    
    parse: function (item) {
        item.start_time = moment.unix(item.start_time).format("DD/MM/YYYY h:mmA");
        item.spent = moment.duration(item.spent, 'seconds').format();       
        return item;
    },
    
    validate: function (attrs) {
        var errors = [];

        if (!attrs.start_time) {
            errors.push({name: 'start_time', message: 'Please fill start date field.'});
        }
        if (!attrs.name) {
            errors.push({name: 'name', message: 'Please fill item name field.'});
        }
        if (!attrs.description) {
            errors.push({name: 'description', message: 'Please fill description field.'});
        }

        return errors.length > 0 ? errors : false;
    }
});

window.TimelogCollection = Backbone.Collection.extend({
    model: Timelog,
    localStorage: new Backbone.LocalStorage("TimelogCollection"),
    
    sortAttribute: "start_time",
    sortDirection: 1,
    
    sortTimelogs: function (attr) {
    	console.log('sortTimelogs');
    	this.sortAttribute = attr;
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
    }
});

TimelogCollection.bind('add', function() {
	console.log('Timelog Collection Add');
});

TimelogCollection.bind('remove', function() {
	console.log('Timelog Collection Remove');
});

TimelogCollection.bind('refresh', function() {
	console.log('Timelog Collection Refresh');
});