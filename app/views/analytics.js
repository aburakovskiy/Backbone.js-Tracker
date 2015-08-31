window.AnalyticsTableView = Backbone.View.extend({

	//tagName: 'table',
	_TimelogItemViews: [],

    initialize:function () {
        var self = this;
        //this.model.on('change', this.render, this);
    },

    render: function (eventName) {
    	this.template = _.template($('#analytics').html());
        $(this.el).html(this.template());
        return this;
    },
    
});

window.AnalyticsTableItemView = Backbone.View.extend({

    tagName:"tr",
    
    initialize:function () {
        this.template = _.template($('#analytics-item').html());
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

});