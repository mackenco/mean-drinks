angular.module('DrinkListDirective', [])
  .directive('drinkList', function(Ingredient, Drink, $rootScope) {
    return {
      restrict: 'E',
      link: function(scope) {
        scope.options = { favorite: false, unmade: false };

        Ingredient.get().then(function(response) {
          scope.ingredients = response.data; 
        });

        scope.editing = function(drink) {
          if ($rootScope.editingDrink === drink) {
            $rootScope.editingDrink = null; 
          } else {
            $rootScope.editingDrink = drink; 
          }
        };

        scope.setEditIcon = function(drink) {
          if (!$rootScope.editingDrink) {
            return 'glyphicon-plus-sign'; 
          } else if ($rootScope.editingDrink._id === drink._id) {
            return 'glyphicon-minus-sign'; 
          } else {
            return 'half-opacity glyphicon-plus-sign'; 
          }
        };

        scope.remove = function(drink) {
          Drink.delete(drink._id)
            .success(function() {
              scope.drinks = _.without(scope.drinks, drink);
            })
            .error(function(err) {
              console.error(err); 
            });
        };

      },
      scope: {
        drinks: '=',
        editable: '='
      },
      templateUrl: 'views/_drinkList.html'
    };
  });
