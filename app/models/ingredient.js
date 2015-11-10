var mongoose = require('mongoose');

module.exports = mongoose.model('Ingredient', {
  name: { type: String, lowercase: true, unique: true, default: '' },
  inPantry: { type: Boolean, default: false }
});
