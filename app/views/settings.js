window.SettingsView = Backbone.View.extend({

	cities: [],
	currentTimezone: null,
	
    initialize:function () {
        this.model.on('change', this.render, this);
        this.currentTimezone = this.model.get('tz');
        
        var cities = moment.tz.names();
        for(var key in cities) {
        	this.cities.push({
        		name: cities[key],
        		offset: moment.tz(cities[key]).format('Z')
        	});
        }
        
        this.cities.sort(function(a, b){
        	return parseInt(a.offset.replace(":", ""), 10) - parseInt(b.offset.replace(":", ""), 10);
        });

    },

    render: function (eventName) {
    	this.template = _.template($('#settings').html());
    	$(this.el).html(this.template(this.model.toJSON()));
    	
    	this.$('select').empty().append($(this.getHTML()));
    	this.selectValue(this.currentTimezone);
    	
        return this;
    },
    
    getHTML: function() {
    	var html = '';
        var offset = 0;
        var i, c = this.cities.length, city;

        for(i = 0; i < c; i++) {
        	city = this.cities[i];
        	html += '<option data-offset="' + city.offset + '" value="'+ city.name +'">(GMT ' + city.offset + ') ' + city.name +'</option>';
        }

        return html;
    },
    
    selectValue : function(value){
        value = value || this.currentTimezone;

        var match = this.$('select').find('option[value="' + value + '"]');
        if (match.length){
        	this.$('select').val(match.val());
        }

        return this.$('select');
    }
    
});
