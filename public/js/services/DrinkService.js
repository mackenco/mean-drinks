angular.module('DrinkService', [])
  .factory('Drink', ['$http', function($http) {
  
    return {
      get: function() {
        return $http.get('/api/drinks'); 
      },

      offBy: function(num) {
        return $http.get('/api/drinks?off_by=' + num);       
      },
  
      create: function(drinkData) {
        return $http.post('/api/drinks', drinkData); 
      },

      update: function(id, drinkData) {
        return $http.put('/api/drinks/' + id, drinkData);       
      },

      delete: function(id) {
        return $http.delete('/api/drinks/' + id);         
      } 
    } 
  }]);
