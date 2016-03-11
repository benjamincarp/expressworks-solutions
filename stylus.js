var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var stylus = require('stylus');

var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates') );

app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()});
});

app.post('/form', function(req, res){
    res.end(req.body.str.split('').reverse().join(''));
});

app.listen(app.listen(process.argv[2]));