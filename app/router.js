// Backbone Router
var AppRouter = Backbone.Router.extend({

    initialize:function () {
        
    },

    routes:{
        "timelog/add": "addTimelog",
        "timelog/edit/:id": "editTimelog",
        "timelog/:id": "viewTimelog",
        "": "list",
        "analytics": "analytics",
        "analytics/:group/:period": "analytics",
        "settings": "settings"
    },

    list:function () {
        console.log('List Route');

        $('#header').html(new TimelogAdd({model:new Timelog()}).render().el);
        
        //this.timelogList = new TimelogCollection(TimelogData);
        this.timelogList = new TimelogCollection();
        this.timelogList.fetch();
        
        this.timelogListView = new TimelogListView({model:this.timelogList});
        console.log('Timelog List: ', this.timelogList);
        app.showView('#content', this.timelogListView);
    },

    editTimelog:function (id) {
        console.log('Edit Timelog Route ' + id);

        var timelog = app.timelogList.get(id);
        app.showView('#content', new TimelogEdit({model:timelog}));
    },

    viewTimelog:function (id) {
        console.log('View Timelog Route ' + id);

        var timelog = app.timelogList.get(id);
        app.showView('#content', new TimelogView({model:timelog}));
    },

    addTimelog:function () {
        console.log('Add Timelog Route');

        app.showView('#content', new TimelogEdit({model:new Timelog()}));
    },

    showView:function (selector, view) {
        $(selector).html(view.render().el);
        this.currentView = view;
        return view;
    },

    refreshTimelogs: function() {
        this.timelogList = new TimelogCollection();
        this.timelogListView = new TimelogListView({model:this.timelogList});
    },
    
    analytics: function(group, period) {
    	// redirect to default filters
    	if (typeof(group) == 'undefined' || typeof(period) == 'undefined') {
    		app.navigate('/analytics/day/week', true);
    		return false;
    	}
        
    	this.timelogList = new TimelogCollection();
        this.timelogList.fetch();
    	
        var self = this;
        self.analytics = new AnalyticsCollection();
        
        var logs = this.timelogList.models;
        _.each(logs, function(model, index, list){
        	
        	var startdate = moment();
        	switch (period) {
        		case "week":
        			startdate = startdate.subtract(1, "week");
        			break;
        		case "month":
        			startdate = startdate.subtract(1, "month");
        			break;
        		case "quarter":
        			startdate = startdate.subtract(3, "months");
        			break;
        	}
        	if (moment(model.get("start_time"), "DD/MM/YYYY hh:mm:ss").isBefore(startdate.format())) {
        		return;
        	}
        	
        	switch (group) {
        		case "week":
        			var date_parsed = moment(model.get("start_time"), "DD/MM/YYYY h:mmA").startOf('isoweek').format("DD/MM/YYYY") + " - " + moment(model.get("start_time"), "DD/MM/YYYY h:mmA").endOf('isoweek').format("DD/MM/YYYY");
        			var date = moment(model.get("start_time"), "DD/MM/YYYY h:mmA").isoWeek();
        			break;
        		default:
        			var date_parsed = moment(model.get("start_time"), "DD/MM/YYYY h:mmA").format("DD/MM/YYYY");
        			var date = moment(date_parsed, "DD/MM/YYYY").unix();
        		
        	}
        	
        	var spent = moment.duration(model.get("spent"), "hh:mm:ss").asSeconds();
        	//console.log(model.get("start_time"), date, spent);
        	
            var analytics_row = self.analytics.getByDate(date);
            if (typeof(analytics_row) == 'undefined') {
            	analytics_row = new Analytics({
            		"date":date,
            		"date_parsed":date_parsed,
            		"spent":spent
            	//}, {parse: true});
            	});
            	self.analytics.add(analytics_row);
            } else {
            	analytics_row.set({
                	spent: (analytics_row.get('spent') + spent),
                });
            }
        });
    	
        this.analyticsTableView = new AnalyticsTableView({
        	model:self.analytics,
        	group:group,
        	period:period
        });

        $('#header').html('');
    	app.showView('#content', this.analyticsTableView);
    },
    
    settings:function () {

    	this.settings_row = new Settings();
        this.settings_row.fetch();
        
        console.log(this.settings_row.get('tz'));
        
        $('#header').html('');
        app.showView('#content', new SettingsView({model:this.settings_row}));
    },
    
});


//$(function () {
	app = new AppRouter();
	
	app.bind('all', function(route, section) {
	    var $el;
	    route = route.replace('route:', '');
	
	    $el = $('#menu .' + route);
	    //console.log(route);
	    if (!$el.length) return;
	
	    if ($el.hasClass('active')) {
	        return;
	    } else {
	        $('#menu li.active').removeClass('active');
	        $el.addClass("active");
	    }
	});
	
	Backbone.history.start();
//});