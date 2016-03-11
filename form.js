var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({extended: false}));

app.set('view engine', 'jade');
app.set('views', ( process.argv[3] || path.join(__dirname, 'templates') ));

app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()});
});

app.post('/form', function(req, res){
    res.end(req.body.str.split('').reverse().join(''));
});

app.listen(app.listen(process.argv[2]));