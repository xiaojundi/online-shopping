import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getShoppingCartList,
  removeProductFromShoppingCart,
  subtractQuantity,
  addQuantity,
} from '../../redux/shoppingCart/action';
import { Table, Button, Tag, Checkbox, Menu, Row, Col } from 'antd';
import shoppingCartItem from '../../components/shopping-cart-item/shopping-cart-item';
import './shopping-cart-list.less';

class ShoppingCartList extends Component {
  state = {
    totalPrice: 0,
  };

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
        render: ({ product, userId }) => (
          <div>
            <Button
              onClick={() => this.props.subtractQuantity(product, userId)}
            >
              -
            </Button>
            {product.quantity}
            <Button onClick={() => this.props.addQuantity(product, userId)}>
              +
            </Button>
          </div>
        ),
      },
      {
        title: '总价',
        key: 'price',
        dataIndex: 'price',
      },
    ]);
  };

  addAllPrice = () => {
    let sum = 0;
    this.props.products.map((product) => {
      sum = sum + product.price;
    });
    return sum;
  };

  removeProductFromCart = (productId, userId) => {
    this.props.removeProductFromShoppingCart(productId, userId);
  };

  addProdctQuantity = (product, userId) => {
    this.props.addQuantity(product, userId);
  };

  subtractProductQuantity = (product, userId) => {
    this.props.subtractQuantity(product, userId);
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
        quantity: { product, userId: this.props.user._id },
        price: product.price,
      };
    }));
  };

  render() {
    return (
      <div className='shopping-cart-list col-12 col-offset-6'>
        <Row>
          <Col span={18} offset={3}>
            <Table columns={this.initColumn()} dataSource={this.initData()} />
          </Col>
        </Row>
        <Row>
          <Col span={18} offset={3} className='shopping-cart-check-out'>
            <span>总价：{this.addAllPrice()} 元</span>
            <Button type='primary'>结账</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  (state) => ({ user: state.user, products: state.shoppingCart.products }),
  {
    getShoppingCartList,
    removeProductFromShoppingCart,
    subtractQuantity,
    addQuantity,
  }
)(ShoppingCartList);
