var Drink = require('./models/drink');
var Ingredient = require('./models/ingredient');

exports.list = function(req, res) {
  Drink.find(function(err, drinks) {
    if (err) { res.send(err); } 
    res.json(drinks);
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
  drink.ingredient_ids = [];
  d.ingredients.forEach(function(i) {
    Ingredient.findOne({'name': i}, function(err, ingredient) {
      if (err) { res.send(err); }
      if (ingredient) {
        drink.ingredient_ids.push(ingredient._id);
      } else {
        var newIngredient = new Ingredient();
        newIngredient.name = i;
        newIngredient.save();
        drink.ingredient_ids.push(newIngredient._id);
      }
    });
  });

  drink.save(function(err) {
    if (err) { res.send(err); } 
  });

  res.json({ message: 'All done' });
};
