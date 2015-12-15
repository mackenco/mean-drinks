angular.module('DrinkCtrl', [])
  .controller('DrinkController', function($scope, $rootScope, Drink) {
    $rootScope.all = true;
    Drink.get().then(function(response) {
      $scope.drinks = response.data;
    }); 
  });
