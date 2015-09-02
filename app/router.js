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
    },

    list:function () {
        console.log('List Route');

        $('#header').html(new TimelogAdd({model:new Timelog()}).render().el);
        
        //this.timelogList = new TimelogCollection(TimelogData);
        
        this.timelogList = new TimelogCollection();
        this.timelogList.fetch();
        
        /*var timelog = new Timelog({"start_time":1439664115, "spent":4600, "name":"Name 2", "description":"Description 2"});
        this.timelogList.add(timelog);
        timelog.save();*/
        
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
    
    analytics: function() {
    	console.log('analytics');
        
    	this.timelogList = new TimelogCollection();
        this.timelogList.fetch();
    	
        var self = this;
        self.analytics = new AnalyticsCollection();
        
        var logs = this.timelogList.models;
        _.each(logs, function(model, index, list){
        	
        	var date = moment(model.get("start_time"), "DD/MM/YYYY h:mmA").format("DD/MM/YYYY");
        	
        	var spent = moment.duration(model.get("spent"), "hh:mm:ss").asSeconds();
        	console.log(model.get("start_time"), date, spent);
        	
            var analytics_row = self.analytics.getByDate(date);
            if (typeof(analytics_row) == 'undefined') {
            	analytics_row = new Analytics({
            		"date":date,
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
    	
    	
        this.analyticsTableView = new AnalyticsTableView({model:self.analytics});

        $('#header').html('');
    	app.showView('#content', this.analyticsTableView);
    }

});


//$(function () {
	app = new AppRouter();
	
	app.bind('all', function(route, section) {
	    var $el;
	    route = route.replace('route:', '');
	
	    $el = $('#menu .' + route);
	    //console.log('#menu .' + route, $el.length);
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