var Drink = require('./models/drink');
var Ingredient = require('./models/ingredient');
var _ = require('underscore');
var fs = require('fs');

exports.list = function(req, res) {
  var offBy = req.query.off_by;

  return Drink.find().sort('name').then(function(drinks) {
    if (offBy) {
      return Ingredient.find({ inPantry: true}).then(function(ingreds) {
        var pantry = _.pluck(ingreds, 'name'),
        returnDrinks = [];

        _.each(drinks, function(drink) {
          var diff = _.difference(drink.ingredients, pantry);
          if (diff.length === Number(offBy)) { 
            var toPush = drink.toObject();
            toPush.diff = diff;
            returnDrinks.push(toPush); 
          } 
        }); 

        return returnDrinks;
      });

    } else {
      return drinks;
    }
  })
  .then(function(drinks){
    res.json(drinks);
  })
  .catch(function(err) {
    res.send(err); 
  });
};

exports.create = function(req, res) {
  var drink = new Drink();
  drink.name = req.body.name;
  drink.made = req.body.made;
  drink.favorite = req.body.favorite;
  drink.url = req.body.url;
  drink.ingredients = req.body.ingredients;

  _.each(drink.ingredients, function(i) {
    Ingredient.findOne({ name: i }, function(err, ingredient) {
      if (!ingredient) { 
        var newIngredient = new Ingredient({name: i});
        newIngredient.save(function(err) {
          if (err) { res.send(err); } 
        });
      }
    }); 
  });

  drink.save(function(err) {
    if (err) { res.send(err); } 

    res.json({ message: 'Drink added', id: drink._id });
  });
};

exports.show = function(req, res) {
  Drink.findById(req.params.drink_id, function(err, drink) {
    if (err) { res.send(err); } 
    res.json(drink);
  });
}

exports.update = function(req, res) {
  Drink.findById(req.params.drink_id, function(err, drink) {
    if (err) { res.send(err); } 

    drink.name = req.body.name;
    drink.made = req.body.made;
    drink.favorite = req.body.favorite;
    drink.url = req.body.url;
    drink.ingredients = req.body.ingredients;

    drink.save(function(err) {
      if (err) { res.send(err); } 

      res.json({ message: 'Drink updated!', id: drink._id });
    });

  });
};

exports.delete = function(req, res) {
  Drink.remove({
    _id: req.params.drink_id 
  }, function(err, drink) {
    if (err) { res.send(err); }
    res.json({ message: 'Successfully deleted' });
  });
};

exports.drop = function(req, res) {
  Drink.remove().then(function() {
    res.json({ message: "What have you done" });
  })
  .catch(function(err) {
    res.send(err); 
  });
};

exports.seed = function(req, res) {
  var contents = fs.readFileSync('drinks.json'),
      jsonDrinks = JSON.parse(contents);

  _.each(jsonDrinks, function(d) {
    var drink = new Drink();
    drink.name = d.name;
    drink.made = d.made;
    drink.favorite = d.favorite;
    drink.url = d.url;
    drink.ingredients = d.ingredients;

    drink.save(function(err) {
      if (err) { res.send(err); } 
    });
 
  });

  res.json({ message: "Done" });
};
