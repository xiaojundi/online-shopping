import React, { Component } from 'react';
import Header from '../../components/header';
import MidNav from '../../components/mid-nav';
import PageFooter from '../../components/footer';
import {
  BASE_IMG_URL,
  MARKET_LOAD_PRODUCT_NUMBER,
  MARKET_MENU,
} from '../../utils/constants';
import { reqAllProducts, reqCategorys, reqAllCategorys } from '../../api';
import { Card, Icon, Avatar, Button, Layout } from 'antd';
import { Carousel } from 'antd';
import MARKET_MENU_DETAIL from '../../config/marketMenuConfig';
import './market.less';
import banner_1 from './images/banner_1.jpg';
import banner_2 from './images/banner_2.jpg';

const { Meta } = Card;
const { Content } = Layout;

export default class Market extends Component {
  state = {
    products: [],
    productShow: [],
    startNumber: 0,
    totalNumber: 0,
    categoriesMenu: [],
  };

  getCategoryMenu = async () => {
    let menu = [];
    let subMenu = [];
    const categories = await reqAllCategorys();
    categories.data.map((category) => {
      if (category.parentId === '0') {
        menu.push(category);
      } else {
        subMenu.push(category);
      }
    });
    menu.map((menuItem) => {
      if (!menuItem['subMenu']) {
        menuItem['subMenu'] = [];
      }
      subMenu.map((subMenuItem) => {
        if (subMenuItem.parentId === menuItem._id) {
          menuItem.subMenu.push(subMenuItem);
        }
      });
    });
    this.setState({
      categoriesMenu: menu,
    });
  };

  getProductList = async () => {
    const products = await reqAllProducts();
    await this.setState({
      products: products.data,
      totalNumber: products.data.length,
    });
    this.loadMoreProduct();
  };

  loadMoreProduct = () => {
    this.setState((state) => {
      let productShow = this.state.productShow.concat(
        this.state.products.slice(
          this.state.startNumber,
          MARKET_LOAD_PRODUCT_NUMBER + this.state.startNumber
        )
      );
      return {
        startNumber: MARKET_LOAD_PRODUCT_NUMBER + this.state.startNumber,
        productShow: productShow,
      };
    });
  };

  renderProductList = (products) => {
    return products.map((product, index) => (
      <Card
        key={index}
        cover={
          <img alt={product.imgs[0]} src={BASE_IMG_URL + product.imgs[0]} />
        }
        actions={[
          <div>
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

  componentDidMount() {
    this.getProductList();
    this.getCategoryMenu();
  }

  render() {
    return (
      <Layout className='market'>
        <Header />
        <Content>
          <Carousel>
            <div>
              <a href='#'>
                <img src={banner_1} alt='banner_1.jpg' />
              </a>
            </div>
            <div>
              <a href='#'>
                <img src={banner_2} alt='banner_2.jpg' />
              </a>
            </div>
          </Carousel>
          <MidNav
            menuList={this.state.categoriesMenu}
            marketMenu={MARKET_MENU}
            marketMenuDetail={MARKET_MENU_DETAIL}
          />
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
        </Content>
        <PageFooter />
      </Layout>
    );
  }
}
