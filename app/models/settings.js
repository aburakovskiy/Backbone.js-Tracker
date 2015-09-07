window.Settings = Backbone.Model.extend({

	localStorage: new Backbone.LocalStorage("Settings"),
	
    defaults: {
    	"id": 1,
    	"tz": "Europe/Kiev"
    },
    
});