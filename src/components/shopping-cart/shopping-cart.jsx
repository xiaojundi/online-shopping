import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import {
  getShoppingCartList,
  removeProductFromShoppingCart,
} from '../../redux/shoppingCart/action';
import shoppingCartitem from '../shopping-cart-item/shopping-cart-item';
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
          return shoppingCartitem(
            product,
            this.props.user._id,
            this.removeProductFromCart
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
