var mongoose = require('mongoose');

module.exports = mongoose.model('Ingredient', {
  name: {type: String, default: ''}
});
