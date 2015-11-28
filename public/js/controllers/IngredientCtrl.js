angular.module('IngredientCtrl', [])
  .controller('IngredientController', function($scope, Ingredient) {

    Ingredient.get().then(function(response) {
      $scope.ingredients = response.data; 
    });

    $scope.remove = function(ingredient) {
      ingredient.inPantry = false; 
      Ingredient.update(ingredient._id, ingredient);
    };

    $scope.add = function(ingredient) {
      if (_.findWhere($scope.ingredients, { name: ingredient.name })) {
        ingredient.inPantry = true;
        Ingredient.update(ingredient._id, ingredient); 
      } else {
        var i = { name: ingredient, inPantry: true };
        Ingredient.create(i).then(function() {
          $scope.ingredients.push(i);
        }); 
      }
      $scope.newIngredient = null;
    };

  });
