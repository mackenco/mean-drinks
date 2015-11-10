var Ingredient = require('./models/ingredient');

  module.exports = function(app) {
 
    app.get('/api/ingredients', function(req, res) {
      Ingredient.find(function(err, ingredients) {
        if (err) { res.send(err); }
        res.json(ingredients); 
      }); 
    }); 

    app.post('/api/ingredients', function(req, res) {
      var ingredient = new Ingredient();
      ingredient.name = req.body.name; 

      ingredient.save(function(err) {
        if (err) { res.send(err); }

        res.json({ message: 'Ingredient added' }); 
      });
    });

    app.get('/api/ingredients/:ingredient_id', function(req, res) {
      Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
        if (err) { res.send(err); }
        res.json(ingredient); 
      }); 
    });

    app.put('/api/ingredients/:ingredient_id', function(req, res) {
      Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
        if (err) { res.send(err); }

        ingredient.name = req.body.name;

        ingredient.save(function(err) { 
          if (err) { res.send(err); } 
          res.json({ message: 'Ingredient updated!' });
        });
      }); 
    });

    app.delete('/api/ingredients/:ingredient_id', function(req, res) {
      Ingredient.remove({
        _id: req.params.ingredient_id 
      }, function(err, ingredient) {
        if (err) { res.send(err); } 
        res.json({ message: 'Successfully deleted' });
      }); 
    });

    app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html'); 
    });
  }
