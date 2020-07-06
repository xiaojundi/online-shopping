import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { Row, Col, Button, Icon } from 'antd';
import { addToCart } from '../../redux/shoppingCart/action';
import './market-product-detail.less';
import { Redirect } from 'react-router-dom';
import { BASE_IMG_URL } from '../../utils/constants';

class MarketProductDetail extends Component {
  getProductDetail = (product, user) => {
    return (
      <div className='market-product-detail-description'>
        <h1>产品名: {product.name}</h1>
        <h2>产品编码: {'#' + product.categoryId.slice(0, 8)}</h2>
        <div>价格: {product.price}</div>
        <div>数量: </div>
        <div>
          <Button
            onClick={() => {
              if (!this.props.user._id) {
                this.props.history.push('/login');
              }
              this.props.addToCart(product, user);
            }}
            type='primary'
            shape='round'
            size={'large'}
          >
            <Icon type='shopping' key='setting' />
            加入购物车
          </Button>
          <Button>立即购买</Button>
        </div>
        <div>配送到家</div>
        <div>店内自提</div>
      </div>
    );
  };

  render() {
    const product = this.props.displayProductDetail;
    const user = this.props.user;
    let imgs = product.imgs;
    imgs = imgs.concat(imgs);
    const settings = {
      customPaging: function (i) {
        return (
          <a>
            <img src={BASE_IMG_URL + imgs[i]} />
          </a>
        );
      },
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className='market-product-detail'>
        <Row className='market-product-detail-row-1'>
          <Col span={20} offset={2}>
            {' '}
            <div className='item-image-slider'>
              <Row>
                <Col span={2}></Col>
                <Col span={10}>
                  {' '}
                  <Slider {...settings}>
                    {imgs.map((url, index) => (
                      <div key={index} className='item-image'>
                        <img src={BASE_IMG_URL + url} alt='' />
                      </div>
                    ))}
                  </Slider>
                </Col>
                <Col span={12}>{this.getProductDetail(product, user)}</Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div className='market-product-desc'>
          <div>详情:</div>
          <div>{product.desc}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    displayProductDetail: state.displayProductDetail,
  }),
  { addToCart }
)(MarketProductDetail);
