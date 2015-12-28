angular.module('DrinkFormDirective', [])
  .directive('drinkForm', function(Drink, $rootScope) {
    return {
      restrict: 'E',
      link: function(scope) {
        scope.addOrEditButton = function() {
          return $rootScope.editingDrink ? "Edit" : "Add"; 
        };

        scope.addOrEdit = function(drink) {
          drink.ingredients = drink.ingredients.split(",");
          if ($rootScope.editingDrink) {
            console.log(drink);
            console.log(drink.ingredients); 
          } else {
          
          }
        };
      },
      templateUrl: 'views/_drinkForm.html' 
    };
  });
