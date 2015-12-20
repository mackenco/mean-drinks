angular.module('DrinkFormDirective', [])
  .directive('drinkForm', function(Drink, $rootScope) {
    return {
      restrict: 'E',
      link: function(scope) {
      
      },
      templateUrl: 'views/_drinkForm.html' 
    };
  });
