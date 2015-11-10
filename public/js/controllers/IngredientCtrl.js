angular.module('IngredientCtrl', [])
  .controller('IngredientController', function($scope, Ingredient) {
    $scope.dummy = ['gin', 'rum', 'bourbon'];

    Ingredient.get().then(function(response) {
      $scope.ingredients = response.data; 
    });

    $scope.remove = function(ingredient) {
      ingredient.inPantry = false; 
    };

    $scope.add = function(ingredient) {
      ingredient.inPantry = true;
      Ingredient.create(ingredient).then(function(response) {
        $scope.ingredients.push(ingredient);
        $scope.newIngredient = {};
      }); 
    };
  });
