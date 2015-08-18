window.TimelogListView = Backbone.View.extend({

	//tagName: 'table',
	_TimelogItemViews: [],

    initialize:function () {
    	
        this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (timelog) {
            $(self.el).append(new TimelogListItemView({model:timelog}).render().el);
        });
        this.model.on('change', this.render, this);
        
        this.listenTo(this.model, "sort", this.updateTable);
    },

    render:function (eventName) {
    	this.template = _.template($('#list').html());
        $(this.el).html(this.template({timelogs: this.model.models}));
        
     // Setup the sort indicators
        this.$('th')
               .append($('<span>'))
               .closest('thead')
               .find('span')
                 .end()
               .find('[column="'+this.model.sortAttribute+'"] span')
                 .removeClass('icon-none').addClass(this.sortUpIcon);
        
        this.updateTable();
        
        return this;
    },
    
    sortUpIcon: 'glyphicon glyphicon-chevron-up',
    sortDnIcon: 'glyphicon glyphicon-chevron-down',
    
    events: {
    	"click th": "headerClick",
    	"click .delete": "deleteTimelog"
    },
    
    headerClick: function(e) {
    	var $el = $(e.currentTarget),
    		ns = $el.attr('column'),
    		cs = this.model.sortAttribute;
    	if (ns == cs) {
    		this.model.sortDirection *= -1;
    	} else {
    		this.model.sortDirection = 1;
    	}
    	$el.closest('thead').find('span').removeClass();
        if (this.model.sortDirection == 1) {
           $el.find('span').removeClass().addClass(this.sortUpIcon);
        } else {
           $el.find('span').removeClass().addClass(this.sortDnIcon);
        }
        this.model.sortTimelogs(ns);
     },
     
     deleteTimelog: function (e) {
    	 var id = $(e.currentTarget).data("id");
    	 var item = this.model.get(id);
    	 item.destroy({
             success:function () {
                 app.navigate('/', true);
             },
             error: function(model, response) {
                 alert(response.responseText);
                 return false;
             }
         });
         return false;
     },
     
     updateTable: function () {
    	 console.log('updateTable');
         var ref = this.model,
         	 $table;

         _.invoke(this._TimelogItemViews, 'remove');
         $table = this.$('tbody');

         this._TimelogItemViews = this.model.map(
        		 function (obj) {
                     var v = new TimelogListItemView({  model: ref.get(obj) });
                     $table.append(v.render().$el);
                     return v;
                 });
      }
    
});

window.TimelogListItemView = Backbone.View.extend({

    tagName:"tr",
    
    events: {
    	"mouseenter": "showOptions",
    	"mouseleave": "hideOptions",
    },

    initialize:function () {
        this.template = _.template($('#item').html());
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    
    showOptions: function() {
    	$(this.el).find(".delete").show()
    },

    hideOptions: function() {
    	$(this.el).find(".delete").hide();
    },

});