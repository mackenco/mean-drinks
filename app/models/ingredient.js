var mongoose = require('mongoose');

module.exports = mongoose.model('Ingredient', {
  name: { type: String, lowercase: true, default: '' },
  inPantry: { type: Boolean, default: false }
});
