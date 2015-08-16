window.TimelogView = Backbone.View.extend({
    initialize:function () {
        this.template = _.template(tpl.get('view'));
        this.model.bind("change", this.render, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template({timelog: this.model}));
        return this;
    },

    events:{
        "click .delete":"deleteTimelog"
    },

    deleteTimelog:function () {
        this.model.destroy({
            success:function () {
                alert('Timelog deleted successfully');
                app.navigate('/', true);
            },
            error: function(model, response) {
                alert(response.responseText);
                return false;
            }
        });
        return false;
    }

});