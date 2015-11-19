angular.module('DrinkCtrl', [])
  .controller('DrinkController', function($scope, Drink) {
    Drink.get().then(function(response) {
      $scope.drinks = response.data;
    }); 
  });
