angular.module('Filters', [])
  .filter('iPrint', function() {
    return function(input, diff) {
      var str, 
          out = "";
      
      input.sort().forEach(function(ingredient) {
        if (diff && diff.indexOf(ingredient) > -1) {
          str = ingredient.toUpperCase(); 
        } else {
          str = ingredient[0].toUpperCase() + ingredient.slice(1); 
        } 
        out += (str + " | ");   
      }); 

      return out.slice(0, out.length -2);
    };
  })

  .filter('titleize', function() {
    return function(input) {
      return input.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }; 
  })

  .filter('favorites', function() {
    return function(drinks, status) {
      if (!status) { return drinks; } 
      results = _.filter(drinks, function(drink) {
        return drink.favorite === true; 
      });
      return results; 
    } 
  });
