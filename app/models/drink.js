var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('Drink', {
  name: { type: String, lowercase: true, unique: true },
  unmade: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
  url: String,
  ingredients: [String]
});
