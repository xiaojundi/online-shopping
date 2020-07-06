import React, { Component } from 'react';
import { Card, Icon, Avatar, Button } from 'antd';
import { addToCart } from '../../redux/shoppingCart/action';
import { displayProductDetail } from '../../redux/marketProductDetail/action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  BASE_IMG_URL,
  MARKET_LOAD_PRODUCT_NUMBER,
} from '../../utils/constants';
import './market-container.less';

const { Meta } = Card;

class MarketContainer extends Component {
  state = {
    products: [],
    productShow: [],
    startNumber: 0,
    totalNumber: 0,
  };

  componentWillReceiveProps(props) {
    this.setState({
      totalNumber: props.products.length,
      products: props.products,
    });
    this.loadMoreProduct();
  }

  renderProductList = (productShow) => {
    return productShow.map((product, index) => (
      <Card
        key={index}
        cover={
          <img
            onClick={() => {
              this.props.displayProductDetail(product);
              this.props.history.push('market/marketproductdetail');
            }}
            alt={product.imgs[0]}
            src={BASE_IMG_URL + product.imgs[0]}
          />
        }
        actions={[
          <div
            onClick={() => {
              if (!this.props.user._id) {
                this.props.history.push('/login');
              }
              this.props.addToCart(product, this.props.user);
            }}
          >
            <Icon type='shopping' key='setting' />
            加入购物车
          </div>,
        ]}
      >
        <Meta
          avatar={
            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          }
          title={`价格: ${product.price}元`}
          description={product.name}
        />
      </Card>
    ));
  };

  loadMoreProduct = () => {
    this.setState((state) => {
      let productShow = state.productShow.concat(
        state.products.slice(
          state.startNumber,
          MARKET_LOAD_PRODUCT_NUMBER + state.startNumber
        )
      );
      return {
        startNumber: MARKET_LOAD_PRODUCT_NUMBER + this.state.startNumber,
        productShow: productShow,
      };
    });
  };

  render() {
    return (
      <div>
        <div className='product-list'>
          {this.renderProductList(this.state.productShow)}
        </div>
        <div
          className='loadMore'
          style={{
            display:
              this.state.startNumber > this.state.totalNumber
                ? 'none'
                : 'block',
          }}
        >
          <Button
            onClick={this.loadMoreProduct}
            type='primary'
            shape='round'
            icon='download'
            size={'large'}
          >
            加载更多
          </Button>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), {
  addToCart,
  displayProductDetail,
})(withRouter(MarketContainer));
