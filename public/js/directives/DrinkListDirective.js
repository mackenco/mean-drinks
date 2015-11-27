angular.module('DrinkListDirective', [])
  .directive('drinkList', function() {
    return {
      restrict: 'E',
      link: function($scope) {
        $scope.collapsedId = null;
        $scope.options = { favorite: false, unmade: false };

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
