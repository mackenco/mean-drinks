var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var db = require('./config/db');

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect(db.url);
// mongoose.connect('mongodb://colin:pw@apollo.modulusmongo.net:27017/y3Pyhoxy');

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

app.listen(port);
console.log('Magic happenin on ' + port);

exports = module.exports = app;
