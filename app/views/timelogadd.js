window.TimelogAdd = Backbone.View.extend({
    initialize:function () {
        _.bindAll(this, 'change', 'saveTimelog');
        this.template = _.template($('#add').html());
        //this.model.bind("change", this.render, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template({timelog: this.model}));
        this.$('#datetimepicker1').datetimepicker();
        
        datetime = this.$('#datetime');
        update();
        setInterval(update, 1000);
        
        return this;
    },

    events:{
        "change input": "change",
        "click .save": "saveTimelog",
        "click .reset": "reset",
    },

    change:function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
    },

    saveTimelog:function () {
        this.model.set({
        	start_time: moment($('#strat_time').val()).unix(),
            name: $('#name').val(),
            spent: $('#spent').val(),
            description: $('#description').val(),
        });
        
        if (this.model.isValid()) {
        	console.log('valid');
        	this.hideErrors();
        } else {
        	console.log('not valid');
        	this.showErrors(this.model.validationError);
        	return false;
        }
        
        if (this.model.isNew()) {
        	app.timelogList.create(this.model, {
                success:function (model, response) {
                    console.log('Timelog Saved');
                    // Refresh
                    console.log(TimelogListView);
                    //app.navigate('/timelog/' + self.model.id, true);
                }, 
                error: function(model, response) {
                    alert(response.responseText);
                    return false;
                }
            });
        	this.reset();
            app.navigate('/', true);
        } else {
            this.model.save();
            console.log('Timelog Saved');
            app.navigate('/timelog/' + this.model.id, true);
        }
        console.log('SaveTimelog');
        return false;
    },
    
    showErrors: function(errors) {
    	var messages = [];
        _.each(errors, function (error) {
        	messages.push(error.message);
        }, this);
        var alert = this.$('.add-timelog').find('.alert');
        alert.removeClass('hidden');
        alert.html(messages.join("<br />"));
    },

    hideErrors: function () {
    	var alert = this.$('.add-timelog').find('.alert');
        alert.addClass('hidden').html('');
    },
    
    reset:function (event) {
    	this.render();
    },

});