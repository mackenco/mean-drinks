angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/make.html',
        controller: 'MakeController' 
      }) 

      .when('/drinks', {
        templateUrl: 'views/drinks.html',
        controller: 'DrinkController' 
      })

      .when('/ingredients', {
        templateUrl: 'views/ingredients.html',
        controller: 'IngredientController' 
      });

      $locationProvider.html5Mode(true);
  }]);
