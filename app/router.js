// Destroy Views
Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

// Backbone Router
var AppRouter = Backbone.Router.extend({
    initialize:function () {
        $('#header').html(new TimelogEdit({model:new Timelog()}).render().el);
    },

    routes:{
        "timelog/add": "addTimelog",
        "timelog/edit/:id": "editTimelog",
        "timelog/:id": "viewTimelog",
        "": "list",
    },

    list:function () {
        console.log('List Route');

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
    	if (this.currentView) {
            this.currentView.close();
        }
        $(selector).html(view.render().el);
        this.currentView = view;
        return view;
    },

    refreshTimelogs: function() {
        this.timelogList = new TimelogCollection();
        this.timelogListView = new TimelogListView({model:this.timelogList});
    },

});

tpl.loadTemplates(['header-template', 'details', 'item', 'list', 'view'], function () {
    app = new AppRouter();
    Backbone.history.start();
});