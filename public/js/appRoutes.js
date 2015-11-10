angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController' 
      }) 

      .when('/ingredients', {
        templateUrl: 'views/ingredients.html',
        controller: 'IngredientController' 
      });

      $locationProvider.html5Mode(true);
  }]);
