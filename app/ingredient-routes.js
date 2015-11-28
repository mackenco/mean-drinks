var Ingredient = require('./models/ingredient');
var _ = require('underscore');

var WHITELIST = ['name', 'inPantry'];

exports.list = function(req, res) {
  Ingredient.find().sort('name').exec(function(err, ingredients) {
    if (err) { res.send(err); }
    res.json(ingredients); 
  }); 
}; 

exports.create = function(req, res) {
  var ingredient = new Ingredient();

  _.each(WHITELIST, function(attr) {
    ingredient[attr] = req.body[attr]; 
  });

  ingredient.save(function(err) {
    if (err) { res.send(err); }

    res.json({ message: 'Ingredient added', id: ingredient._id }); 
  });
};

exports.show = function(req, res) {
  Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
    if (err) { res.send(err); }
    res.json(ingredient); 
  }); 
};

exports.update = function(req, res) {
  Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
    if (err) { res.send(err); }

    _.each(WHITELIST, function(attr) {
      ingredient[attr] = req.body[attr] || ingredient[attr];
    });

    ingredient.save(function(err) { 
      if (err) { res.send(err); } 
      res.json({ message: 'Ingredient updated!', id: ingredient._id });
    });
  }); 
};

exports.delete = function(req, res) {
  Ingredient.remove({
    _id: req.params.ingredient_id 
  }, function(err, ingredient) {
    if (err) { res.send(err); } 
    res.json({ message: 'Successfully deleted' });
  }); 
};

exports.seed = function(req, res) {
  var list = ["absinthe","angostura bitters","bourbon","campari","dry vermouth","egg",
  "gin","grenadine","honey syrup","lemon","light rum","maraschino","orange bitters",
  "orange blossom water","orange juice","orange liqueur","peychauds bitters",
  "rye","scotch","soda","sugar","sweet vermouth","syrup","whiskey","brandy"];

  list.forEach(function(item) {
    var ingredient = new Ingredient();
    ingredient.name = item;
    ingredient.inPantry = true;
    ingredient.save(function(err) { 
      if (err) { res.send(err); } 
    });
  });

  res.json({ message: 'All done' });
};
