const mongoose = require('mongoose');

const shoppingCartSchema = mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  productNumber: { type: Number, required: true },
});

const ShoppingCartModel = mongoose.model('shoppingCart', shoppingCartSchema);

module.exports = ShoppingCartModel;
