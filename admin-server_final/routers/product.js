module.exports = function product(router, ProductModel, pageFilter) {
  // 添加产品
  router.post('/manage/product/add', (req, res) => {
    const product = req.body;
    ProductModel.create(product)
      .then((product) => {
        res.send({ status: 0, data: product });
      })
      .catch((error) => {
        console.error('添加产品异常', error);
        res.send({ status: 1, msg: '添加产品异常, 请重新尝试' });
      });
  });

  //删除产品
  router.post('/manage/product/delete', (req, res) => {
    const productId = req.body.productId;
    ProductModel.deleteOne({ _id: productId })
      .then((product) => {
        res.send({ status: 0, data: product });
      })
      .catch((error) => {
        console.error('删除产品异常', error);
        res.send({ status: 1, msg: '删除产品异常, 请重新尝试' });
      });
  });

  // 获取产品分页列表
  router.get('/manage/product/list', (req, res) => {
    const { pageNum, pageSize } = req.query;
    ProductModel.find({})
      .then((products) => {
        res.send({ status: 0, data: pageFilter(products, pageNum, pageSize) });
      })
      .catch((error) => {
        console.error('获取商品列表异常', error);
        res.send({ status: 1, msg: '获取商品列表异常, 请重新尝试' });
      });
  });

  // 获取
  router.get('/manage/product/all', (req, res) => {
    ProductModel.find({})
      .then((products) => {
        res.send({ status: 0, data: products });
      })
      .catch((error) => {
        console.error('获取商品列表异常', error);
        res.send({ status: 1, msg: '获取商品列表异常, 请重新尝试' });
      });
  });

  // 搜索产品列表
  router.get('/manage/product/search', (req, res) => {
    const {
      pageNum,
      pageSize,
      searchName,
      productName,
      productDesc,
    } = req.query;
    let contition = {};
    if (productName) {
      contition = { name: new RegExp(`^.*${productName}.*$`) };
    } else if (productDesc) {
      contition = { desc: new RegExp(`^.*${productDesc}.*$`) };
    }
    ProductModel.find(contition)
      .then((products) => {
        res.send({ status: 0, data: pageFilter(products, pageNum, pageSize) });
      })
      .catch((error) => {
        console.error('搜索商品列表异常', error);
        res.send({ status: 1, msg: '搜索商品列表异常, 请重新尝试' });
      });
  });

  // 更新产品
  router.post('/manage/product/update', (req, res) => {
    const product = req.body;
    ProductModel.findOneAndUpdate({ _id: product._id }, product)
      .then((oldProduct) => {
        res.send({ status: 0 });
      })
      .catch((error) => {
        console.error('更新商品异常', error);
        res.send({ status: 1, msg: '更新商品名称异常, 请重新尝试' });
      });
  });

  // 更新产品状态(上架/下架)
  router.post('/manage/product/updateStatus', (req, res) => {
    const { productId, status } = req.body;
    ProductModel.findOneAndUpdate({ _id: productId }, { status })
      .then((oldProduct) => {
        res.send({ status: 0 });
      })
      .catch((error) => {
        console.error('更新产品状态异常', error);
        res.send({ status: 1, msg: '更新产品状态异常, 请重新尝试' });
      });
  });
};
