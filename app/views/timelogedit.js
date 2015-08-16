window.TimelogEdit = Backbone.View.extend({
    initialize:function () {
        _.bindAll(this, 'change', 'saveTimelog');
        this.template = _.template(tpl.get('header-template'));
        this.model.bind("change", this.render, this);
    },

    render:function (eventName) {
        console.log(this.model);
        $(this.el).html(this.template({timelog: this.model}));
        return this;
    },

    events:{
        "change input": "change",
        "click .save": "saveTimelog"
    },

    change:function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
    },

    saveTimelog:function () {
        this.model.set({
            name: $('#name').val(),
            description: $('#description').val(),
        });
        if (this.model.isNew()) {
            var self = this;
            app.timelogList.create(this.model, {
                success:function (model, response) {
                    console.log('Timelog Saved');
                    // Refresh
                    console.log(TimelogListView);
                    app.navigate('/timelog/' + self.model.id, true);
                }, 
                error: function(model, response) {
                    alert(response.responseText);
                    return false;
                }
            });
        } else {
            this.model.save();
            console.log('Timelog Saved');
            app.navigate('/timelog/' + this.model.id, true);
        }
        console.log('SaveTimelog');
        return false;
    }

});