import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getShoppingCartList,
  removeProductFromShoppingCart,
} from '../../redux/shoppingCart/action';
import { Table, Divider, Tag, Checkbox, Menu } from 'antd';
import shoppingCartItem from '../../components/shopping-cart-item/shopping-cart-item';

class ShoppingCartList extends Component {
  onChange = (index) => {
    console.log(index);
  };

  initColumn = () => {
    return (this.columns = [
      {
        title: '选择',
        dataIndex: 'choose',
        key: 'choose',
        render: (index) => (
          <Checkbox
            onChange={() => {
              this.onChange(index);
            }}
          ></Checkbox>
        ),
      },
      {
        title: '商品',
        dataIndex: 'product',
        key: 'product',
        render: ({ product, userId, callback }) => {
          return <Menu>{shoppingCartItem(product, userId, callback)}</Menu>;
        },
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '总价',
        key: 'price',
        dataIndex: 'price',
      },
    ]);
  };

  removeProductFromCart = (productId, userId) => {
    this.props.removeProductFromShoppingCart(productId, userId);
  };

  initData = () => {
    return (this.sourceData = this.props.products.map((product, index) => {
      return {
        key: index + 1,
        product: {
          product,
          userId: this.props.user._id,
          callback: this.removeProductFromCart,
        },
        quantity: product.quantity,
        price: product.price,
      };
    }));
    // [
    //   {
    //     key: '1',
    //     product: 'John Brown',
    //     quantity: 32,
    //     price: 100,
    //   },
    //   {
    //     key: '2',
    //     product: 'John Brown',
    //     quantity: 32,
    //     price: 100,
    //   },
    //   {
    //     key: '3',
    //     product: 'John Brown',
    //     quantity: 32,
    //     price: 100,
    //   },
    // ]
  };

  render() {
    return (
      <div>
        <Table columns={this.initColumn()} dataSource={this.initData()} />
      </div>
    );
  }
}

export default connect(
  (state) => ({ user: state.user, products: state.shoppingCart.products }),
  { getShoppingCartList, removeProductFromShoppingCart }
)(ShoppingCartList);
