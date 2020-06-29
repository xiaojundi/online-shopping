module.exports = function category(router, CategoryModel) {
  // 添加分类
  router.post('/manage/category/add', (req, res) => {
    const { categoryName, parentId } = req.body;
    CategoryModel.create({ name: categoryName, parentId: parentId || '0' })
      .then((category) => {
        res.send({ status: 0, data: category });
      })
      .catch((error) => {
        console.error('添加分类异常', error);
        res.send({ status: 1, msg: '添加分类异常, 请重新尝试' });
      });
  });

  //delete category
  router.post('/manage/category/delete', (req, res) => {
    const { categoryId } = req.body;
    let pProductNumb = ProductModel.find({
      $or: [{ pCategoryId: categoryId }, { categoryId: categoryId }],
    }).then((arr) => {
      if (arr.length > 0) {
        res.send({ status: 1, msg: '请清空该类别内商品， 再进行删除操作' });
      } else {
        CategoryModel.deleteOne({ _id: categoryId }).then((doc) => {
          CategoryModel.deleteOne({ parentId: categoryId }).then((doc) => {
            res.send({ status: 0 });
          });
        });
      }
    });
  });

  //获取全部分类
  router.get('/manage/category/listAll', (req, res) => {
    CategoryModel.find({})
      .then((categorys) => {
        res.send({ status: 0, data: categorys });
      })
      .catch((error) => {
        console.error('获取分类列表异常', error);
        res.send({ status: 1, msg: '获取分类列表异常, 请重新尝试' });
      });
  });

  // 获取分类列表
  router.get('/manage/category/list', (req, res) => {
    const parentId = req.query.parentId || '0';
    CategoryModel.find({ parentId })
      .then((categorys) => {
        res.send({ status: 0, data: categorys });
      })
      .catch((error) => {
        console.error('获取分类列表异常', error);
        res.send({ status: 1, msg: '获取分类列表异常, 请重新尝试' });
      });
  });

  // 更新分类名称
  router.post('/manage/category/update', (req, res) => {
    const { categoryId, categoryName } = req.body;
    CategoryModel.findOneAndUpdate({ _id: categoryId }, { name: categoryName })
      .then((oldCategory) => {
        res.send({ status: 0 });
      })
      .catch((error) => {
        console.error('更新分类名称异常', error);
        res.send({ status: 1, msg: '更新分类名称异常, 请重新尝试' });
      });
  });

  // 根据分类ID获取分类
  router.get('/manage/category/info', (req, res) => {
    const categoryId = req.query.categoryId;
    CategoryModel.findOne({ _id: categoryId })
      .then((category) => {
        res.send({ status: 0, data: category });
      })
      .catch((error) => {
        console.error('获取分类信息异常', error);
        res.send({ status: 1, msg: '获取分类信息异常, 请重新尝试' });
      });
  });
};
