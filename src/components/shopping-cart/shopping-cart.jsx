import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import shoppingCart from '../../redux/shoppingCart/reducer';
import {
  getShoppingCartList,
  removeProductFromShoppingCart,
} from '../../redux/shoppingCart/action';
import { BASE_IMG_URL } from '../../utils/constants';
import './shopping-cart.less';

class ShoppingCart extends Component {
  state = {
    products: [],
  };

  removeProductFromCart = (productId, userId) => {
    this.props.removeProductFromShoppingCart(productId, userId);
  };

  componentDidMount() {
    this.props.getShoppingCartList(this.props.user._id);
  }

  // reqRemoveFromCart

  render() {
    if (!this.props.user._id) {
      return <div></div>;
    }
    const menu = (
      <Menu>
        {this.props.products.map((product) => {
          console.log('######');
          console.log(product);
          return (
            <Menu.Item key={product._id} style={{ cursor: 'auto' }}>
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
                      this.removeProductFromCart(
                        product.productId, //商品id
                        this.props.user._id
                      );
                    }}
                  >
                    删除
                  </a>
                </div>
              </div>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
          购物车{`(${this.props.products.length})`}
        </a>
      </Dropdown>
    );
  }
}

export default connect(
  (state) => ({ user: state.user, products: state.shoppingCart.products }),
  {
    getShoppingCartList,
    removeProductFromShoppingCart,
  }
)(ShoppingCart);
