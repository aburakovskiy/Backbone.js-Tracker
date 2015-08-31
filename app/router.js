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
    	//if (this.currentView) {
        //    this.currentView.close();
        //}
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
        
    	this.analytics = new AnalyticsCollection();
        this.analyticsTableView = new AnalyticsTableView({model:this.analytics});
        console.log(this.analyticsTableView);

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