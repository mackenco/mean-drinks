var mongoose = require('mongoose');

module.exports = mongoose.model('Drink', {
  name: { type: String, lowercase: true, unique: true },
  made: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
  url: String,
  ingredient_ids: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}]
});
