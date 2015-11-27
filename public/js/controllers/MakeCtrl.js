angular.module('MakeCtrl', [])
  .controller('MakeController', function($scope, Drink) {

    Drink.offBy(0).then(function(res) {
      $scope.make = res.data;
    });

    Drink.offBy(1).then(function(res) {
      $scope.byOne = res.data;
    });
});
