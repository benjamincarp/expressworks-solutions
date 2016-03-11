var path = require('path');

var express = require('express');
var app = express();

app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));

app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()})
});

app.set('view engine', 'jade');
app.set('views', ( process.argv[3] || path.join(__dirname, 'templates') ));

app.listen(app.listen(process.argv[2]));