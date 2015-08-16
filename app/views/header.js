window.HeaderView = Backbone.View.extend({
	
    initialize:function () {
        this.template = _.template(tpl.get('header-template'));
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    events:{
        "click .save": "addTimelog",
        "click .list": "viewTimelogs",
    },

    addTimelog:function (event) {
        app.navigate("timelog/add", true);
        return false;
    },
    viewTimelogs:function (event) {
        app.navigate("/", true);
        return false;
    }

});