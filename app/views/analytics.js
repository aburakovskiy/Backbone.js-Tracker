window.AnalyticsTableView = Backbone.View.extend({

    initialize:function () {
        this.model.on('change', this.render, this);
    },

    render: function (eventName) {
    	this.template = _.template($('#analytics').html());
        $(this.el).html(this.template());
        _.each(this.model.models, function(data) {
        	this.$('tbody').append(new AnalyticsTableItemView({model : data}).render().el);
        }, this);
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