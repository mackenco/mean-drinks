angular.module('DrinkListDirective', [])
  .directive('drinkList', function(Ingredient) {
    return {
      restrict: 'E',
      link: function($scope) {
        $scope.options = { favorite: false, unmade: false };

        Ingredient.get().then(function(response) {
          $scope.ingredients = response.data; 
        });

      },
      scope: {
        drinks: '=' 
      },
      templateUrl: 'views/_drinkList.html'
    };
  });
