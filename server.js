var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ingredients = require('./app/ingredient-routes');
var drinks = require('./app/drink-routes');

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

app.get('/api/ingredients', ingredients.list);
app.post('/api/ingredients', ingredients.create);
app.get('/api/ingredients/:ingredient_id', ingredients.show);
app.put('/api/ingredients/:ingredient_id', ingredients.update);
app.delete('/api/ingredients/:ingredient_id', ingredients.delete);
app.get('/api/ingredients_seed', ingredients.seed);

app.get('/api/drinks', drinks.list);
// app.post('/api/drinks', drinks.create);
// app.get('/api/drinks/:drink_id', drinks.show);
// app.put('/api/drinks/:drink_id', drinks.update);
app.delete('/api/drinks/:drink_id', drinks.delete);
app.get('/api/drink_seeds', drinks.seed);

app.get('*', function(req, res) {
  res.sendfile('./public/views/index.html');
});

app.listen(port);
console.log('Magic happenin on ' + port);

exports = module.exports = app;
