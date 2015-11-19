angular.module('DrinkListDirective', [])
  .directive('drinkList', function() {
    return {
      restrict: 'E',
      link: function($scope) {
        $scope.collapsedId = null;

        $scope.setCollapse = function(id) { 
          if ($scope.collapsedId === id) {
            $scope.collapsedId = null 
          } else {
            $scope.collapsedId = id; 
          }
        };
      },
      scope: {
        drinks: '=' 
      },
      templateUrl: 'views/_drinkList.html'
    } 
  });
