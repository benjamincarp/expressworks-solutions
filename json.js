var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var stylus = require('stylus');
var crypto = require('crypto');
var fs = require('fs');

var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.param('msgId', function (req, res, next, id) {
    req.msgId = id;
    return next();
});

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates') );

app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()});
});

app.post('/form', function(req, res){
    res.end(req.body.str.split('').reverse().join(''));
});

app.put('/message/:msgId', function(req, res){
    var hash = crypto.createHash('sha1').update(new Date().toDateString() + req.msgId).digest('hex');
    res.end(hash);
});

app.get('/search', function(req, res){
    res.send(req.query);
});

app.get('/books', function(req, res){
    fs.readFile(process.argv[3], function(err, file){
        res.json(JSON.parse(file));
    });
});

app.listen(app.listen(process.argv[2]));