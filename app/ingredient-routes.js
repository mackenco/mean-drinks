var Ingredient = require('./models/ingredient');

exports.list = function(req, res) {
  Ingredient.find(function(err, ingredients) {
    if (err) { res.send(err); }
    res.json(ingredients); 
  }); 
}; 

exports.create = function(req, res) {
  var ingredient = new Ingredient();
  ingredient.name = req.body.name; 
  ingredient.inPantry = req.body.inPantry;

  ingredient.save(function(err) {
    if (err) { res.send(err); }

    res.json({ message: 'Ingredient added' }); 
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

    ingredient.name = req.body.name;
    ingredient.inPantry = req.body.inPantry;

    ingredient.save(function(err) { 
      if (err) { res.send(err); } 
      res.json({ message: 'Ingredient updated!' });
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
