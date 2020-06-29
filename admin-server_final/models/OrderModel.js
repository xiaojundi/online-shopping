// /*
// 能操作categorys集合数据的Model
//  */
// // 1.引入mongoose
// const mongoose = require('mongoose')

// // 2.字义Schema(描述文档结构)
// const categorySchema = new mongoose.Schema({
//   name: {type: String, required: true},
//   parentId: {type: String, required: true, default: '0'}
// })

// // 3. 定义Model(与集合对应, 可以操作集合)
// const CategoryModel = mongoose.model('categorys', categorySchema)

// // 4. 向外暴露Model
// module.exports = CategoryModel

const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  create_time: { type: Number, default: Date.now },
});

const OrderModal = mongoose.model('order', orderSchema);

module.exports = OrderModal;
