import React from 'react';
import { Menu } from 'antd';
import { BASE_IMG_URL } from '../../utils/constants';
import './shopping-cart-item.less';
export default function (product, userId, callback) {
  return (
    <Menu.Item key={product._id} style={{ cursor: 'auto', height: '100%' }}>
      <div className='shoppingCardItem'>
        <img src={BASE_IMG_URL + product.imgs} alt='图片' />
        <div>数量： x{product.quantity}</div>
        <div>总价格价格： {product.quantity * product.price}</div>
        <div>名称： {product.name}</div>
        <div>
          <a
            href='javascript:'
            className='deleteCartItem'
            onClick={() => {
              callback(
                product.productId, //商品id
                userId
              );
            }}
          >
            删除
          </a>
        </div>
      </div>
    </Menu.Item>
  );
}
