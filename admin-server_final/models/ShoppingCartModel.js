const mongoose = require('mongoose');

const shoppingCartSchema = mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  imgs: { type: Array },
  name: { type: String, requried: true },
  price: { type: Number, requried: true },
  detail: { type: String, rquried: true },
  quantity: { type: Number, requried: true },
});

const ShoppingCartModel = mongoose.model('shoppingCart', shoppingCartSchema);

module.exports = ShoppingCartModel;
