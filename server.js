var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
mongoose.connect('localhost');
// mongoose.connect('mongodb://colin:pw@apollo.modulusmongo.net:27017/y3Pyhoxy');

// require('./app/routes')(app);
var Ingredient = require('./app/models/ingredient');

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
  console.log("Somethin' doin");
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'hellooo' });
});

router.route('/ingredients')
  .post(function(req, res) {
    var ingredient = new Ingredient();
    ingredient.name = req.body.name; 

    ingredient.save(function(err) {
      if (err) { res.send(err); }

      res.json({ message: 'Ingredient added' }); 
    });
  })

  .get(function(req, res) {
    Ingredient.find(function(err, ingredients) {
      if (err) { res.send(err); }
      res.json(ingredients); 
    }); 
  });

router.route('/ingredients/:ingredient_id')
  .get(function(req, res) {
    Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
      if (err) { res.send(err); }
      res.json(ingredient); 
    }); 
  })

  .put(function(req, res) {
    Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
      if (err) { res.send(err); }

      ingredient.name = req.body.name;

      ingredient.save(function(err) { 
        if (err) { res.send(err); } 
        res.json({ message: 'Ingredient updated!' });
      });
    }); 
  })

  .delete(function(req, res) {
    Ingredient.remove({
      _id: req.params.ingredient_id 
    }, function(err, ingredient) {
      if (err) { res.send(err); } 
      res.json({ message: 'Successfully deleted' });
    }); 
  });

app.use('/api', router);

app.listen(port);
console.log('Magic happenin on ' + port);
