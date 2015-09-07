window.Settings = Backbone.Model.extend({

	localStorage: new Backbone.LocalStorage("Settings"),
	
    defaults: {
    	"tz": "Europe/Kiev"
    },
    
});