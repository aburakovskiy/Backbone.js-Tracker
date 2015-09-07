window.AnalyticsTableView = Backbone.View.extend({

    initialize:function (options) {
        this.model.on('change', this.render, this);
        this.group = options.group;
        this.period = options.period;
    },

    render: function (eventName) {
    	this.template = _.template($('#analytics').html());
        $(this.el).html(this.template({
    		period:this.period,
    		group:this.group
    	}));
        this.model.sortAnalytics();
        _.each(this.model.models, function(data) {
        	this.$('tbody').append(new AnalyticsTableItemView({model : data}).render().el);
        }, this);

        this.$(".analytics-filter a.active").removeClass("active");
    	this.$(".analytics-filter .group-" + this.group).addClass("active");
    	this.$(".analytics-filter .period-" + this.period).addClass("active");
        
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