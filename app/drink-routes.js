var Drink = require('./models/drink');
var Ingredient = require('./models/ingredient');
var _ = require('underscore');

exports.list = function(req, res) {
  Drink.find(function(err, drinks) {
    if (err) { res.send(err); } 
    res.json(drinks);
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
        console.log(ingredient + ' is new');
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

exports.seed = function(req, res) {
  var d = {
    name: 'Manhattan',
    made: true,
    favorite: true,
    url: 'http://www.thekitchn.com/cocktail-recipe-the-manhattan-the-9bottle-bar-201396',
    ingredients: ['sweet vermouth', 'rye', 'angostura bitters'] 
  };

  var drink = new Drink();
  drink.name = d.name;
  drink.made = d.made;
  drink.favorite = d.favorite;
  drink.url = d.url;
  drink.ingredients = d.ingredients;

  drink.save(function(err) {
    if (err) { res.send(err); } 
  });

  res.json({ message: 'All done' });
};
