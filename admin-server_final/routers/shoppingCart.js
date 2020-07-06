module.exports = function shoppingCart(router, shoppingCartModel) {
  router.post('/manage/shoppingCart/addProdcut', (req, res) => {
    const cartProduct = req.body;
    const quantity = cartProduct.quantity;
    const price = cartProduct.price;
    shoppingCartModel
      .find({
        productId: cartProduct.productId,
        userId: cartProduct.userId,
      })
      .then((products) => {
        if (products.length > 0) {
          shoppingCartModel
            .update(
              {
                productId: cartProduct.productId,
                userId: cartProduct.userId,
              },
              {
                price: price + products[0].price,
                quantity: quantity + products[0].quantity,
              }
            )
            .then((data) => {
              res.send({ status: 0, data });
            })
            .catch((err) => {
              res.send({ status: 1, err });
            });
        } else {
          shoppingCartModel
            .create(cartProduct)
            .then((data) => {
              res.send({ status: 0, data });
            })
            .catch((err) => {
              res.send({ status: 1, err });
            });
        }
      });
  });
  router.post('/manage/shoppingCart/getShoppingCartList', (req, res) => {
    const userId = req.body.userId;
    shoppingCartModel
      .find({ userId })
      .then((data) => {
        res.send({ status: 0, data });
      })
      .catch((err) => {
        res.send({ tatus: 1, err });
      });
  });
  router.post('/manage/shoppingCart/deleteProduct', (req, res) => {
    const productId = req.body.productId;
    shoppingCartModel
      .deleteMany({ productId: productId })
      .then((data) => {
        res.send({ status: 0, data });
      })
      .catch((err) => {
        res.send({ status: 1, err });
      });
  });
};
