var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/testApi', function (req, res) {
    res.send(JSON.stringify({test: "test"}));
});
app.use(express.static('./'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:123@ds151049.mlab.com:51049/db_storage');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("We are in db))!");
    var dataScheme = mongoose.Schema({
        pets: String,
        foods: String
    });

    var Data = mongoose.model('Data', dataScheme);

    var ourData = new Data({pets: 'pets', foods: 'foods'});

    ourData.save(function (err, data) {
        if (err) return console.error(err);
        console.log(data);
    });
});


