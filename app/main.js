var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('H:mm:ss'));
};

$(document).ready(function(){
    datetime = $('#datetime')
    update();
    setInterval(update, 1000);
});

$(function () {
    $('#datetimepicker1').datetimepicker();
});