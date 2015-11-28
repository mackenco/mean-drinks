angular.module('DrinkListDirective', [])
  .directive('drinkList', function(Ingredient) {
    return {
      restrict: 'E',
      link: function($scope) {
        $scope.collapsedId = null;
        $scope.options = { favorite: false, unmade: false };

        Ingredient.get().then(function(response) {
          $scope.ingredients = response.data; 
        });

        $scope.setCollapse = function(id) { 
          if ($scope.collapsedId === id) {
            $scope.collapsedId = null;
          } else {
            $scope.collapsedId = id; 
          }
        };
      },
      scope: {
        drinks: '=' 
      },
      templateUrl: 'views/_drinkList.html'
    };
  });
