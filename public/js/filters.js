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

  .filter('checkboxes', function() {
    return function(drinks, types) {
      if (!types.favorite && !types.unmade) { return drinks; }

      if (types.favorite && types.unmade) {
        return  _.where(drinks, { favorite: true, made: false }); 
      }

      if (types.favorite && !types.unmade) {
        return _.where(drinks, { favorite: true, made: true });
      }

      if (!types.favorite && types.unmade) {
        return _.where(drinks, { favorite: false, made: false }); 
      }
    }; 
  })

  .filter('editIngredientPrint', function() {
    return function(input) {
      if (input) { return input.join(", "); }
      return null;
    }; 
  })

  .filter('ingredients', function() {
    return function(drinks, ingredient) {
      if (!ingredient) { return drinks; }
      return _.filter(drinks, function(d) {
        return d.ingredients.indexOf(ingredient.name) > -1; 
      });
    }; 
  });
