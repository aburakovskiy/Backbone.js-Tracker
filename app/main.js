var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('H:mm:ss'));
};
