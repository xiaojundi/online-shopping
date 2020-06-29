/*
用来定义路由的路由器模块
 */
const express = require('express');
const md5 = require('blueimp-md5');

const UserModel = require('../models/UserModel');
const CategoryModel = require('../models/CategoryModel');
const ProductModel = require('../models/ProductModel');
const RoleModel = require('../models/RoleModel');
const ShoppingCartModel = require('../models/ShoppingCartModel');
const OrderModel = require('../models/OrderModel');

// 得到路由器对象
const router = express.Router();
// console.log('router', router)

// 指定需要过滤的属性
const filter = { password: 0, __v: 0 };

//用户登录
require('./login')(router, UserModel);

//用户路由
require('./user')(router, UserModel, RoleModel);

//产品路由
require('./product')(router, ProductModel, pageFilter);

//种类路由
require('./category')(router, CategoryModel);

//角色路由
require('./role')(router, UserModel, RoleModel);

/*
得到指定数组的分页信息对象
 */
function pageFilter(arr, pageNum, pageSize) {
  pageNum = pageNum * 1;
  pageSize = pageSize * 1;
  const total = arr.length;
  const pages = Math.floor((total + pageSize - 1) / pageSize);
  const start = pageSize * (pageNum - 1);
  const end = start + pageSize <= total ? start + pageSize : total;
  const list = [];
  for (var i = start; i < end; i++) {
    list.push(arr[i]);
  }

  return {
    pageNum,
    total,
    pages,
    pageSize,
    list,
  };
}

require('./file-upload')(router);

module.exports = router;
