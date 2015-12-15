angular.module('DrinkListDirective', [])
  .directive('drinkList', function(Ingredient) {
    return {
      restrict: 'E',
      link: function(scope) {
        scope.options = { favorite: false, unmade: false };

        Ingredient.get().then(function(response) {
          scope.ingredients = response.data; 
        });

        window.logg = function() {
          console.log(scope.all);
        };

      },
      scope: true,
      // scope: {
      //   drinks: '=' 
      // },
      transclude: true,
      templateUrl: 'views/_drinkList.html'
    };
  });
