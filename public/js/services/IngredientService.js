angular.module('IngredientService', [])
  .factory('Ingredient', ['$http', function($http) {
  
    return {
      get: function() {
        return $http.get('/api/ingredients'); 
      },
  
      create: function(ingredientData) {
        return $http.post('/api/ingredients', ingredientData); 
      },

      update: function(id, ingredientData) {
        return $http.put('/api/ingredients/' + id, ingredientData);       
      },

      delete: function(id) {
        return $http.delete('/api/ingredients/' + id);         
      } 
    } 
  }]);
