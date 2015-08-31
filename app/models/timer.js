window.Timer = Backbone.Model.extend({
    defaults: {
    	"id": null,
        "start_time": null,
        "spent": null,
        "name": "",
        "description": ""
    },
    
    parse: function (item) {
        item.start_time = moment.unix(item.start_time).format("DD/MM/YYYY h:mmA");
        item.spent = moment.duration(parseInt(item.spent), 'seconds').format("d[d] hh:mm:ss", { trim: false });       
        return item;
    },
    
});

window.TimerCollection = Backbone.Collection.extend({
    model: Timer,
    localStorage: new Backbone.LocalStorage("TimerCollection"),
});
