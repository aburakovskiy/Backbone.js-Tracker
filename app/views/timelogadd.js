window.TimelogAdd = Backbone.View.extend({
	
    initialize:function () {
        _.bindAll(this, 'change', 'saveTimelog');
        this.template = _.template($('#add').html());
        //this.model.bind("change", this.render, this);
    },

    render:function (eventName) {
    	console.log('render add form');
        $(this.el).html(this.template({timelog: this.model}));
        this.$('#datetimepicker1').datetimepicker();
        return this;
    },

    events:{
        "change input": "change",
        "click .save": "saveTimelog",
        "click .reset": "reset",
        // Timer actions
        "click .start": "startTimer",
        "click .pause": "pauseTimer",
        "click .stop": "stopTimer",
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
        	this.hideErrors();
        } else {
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
    
    reset: function (event) {
    	this.model.clear();
    	this.render();
    },
    
    startTimer: function() {
    	console.log('startTimer');
    	
    	this.model.set({
        	start_time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        });
    	var self = this;
    	this.timer = setInterval(function () {
            self.tick(this.model);
        }, 1000);
    	this.render();
    	
    	this.$('#datetime').css('display', 'inline-block');
    	this.$('.spent').addClass('hidden');
    	this.$('.start').addClass('hidden');
    	this.$('.pause').removeClass('hidden');
    	this.$('.stop').removeClass('hidden');
   	
    },
    
    pauseTimer: function() {
    	clearInterval(this.timer);
    	console.log(this.model);
    	this.render();
    	this.$('#datetime').css('display', 'inline-block');
    	this.$('.spent').removeClass('hidden');
    	this.$('.start').removeClass('hidden');
    	this.$('.pause').removeClass('hidden');
    	this.$('.stop').removeClass('hidden');
    }, 
    
    stopTimer: function() {
    	clearInterval(this.timer);
    	this.$('#datetime').hide();
    	this.$('.spent').removeClass('hidden');
    	this.$('.start').removeClass('hidden');
    	this.$('.pause').addClass('hidden');
    	this.$('.stop').addClass('hidden');
    },
    
    tick: function () {
    	var spent = parseInt(this.model.get('spent'));
    	if (isNaN(spent)) spent = 0;
    	spent = spent + 1;
    	this.model.set({
    		spent: spent
    	});
    	//console.log(this.model.spent);
        this.$('#datetime').html(moment.duration(this.model.get('spent'), 'seconds').format("hh:mm:ss", { trim: false }));
    }

});