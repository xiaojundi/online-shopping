import React, { Component } from 'react';
import MidNav from '../../components/mid-nav';
import MarketContainer from '../../components/market-container/market-container';
import { MARKET_MENU } from '../../utils/constants';
import { reqAllProducts, reqAllCategorys } from '../../api';
import MARKET_MENU_DETAIL from '../../config/marketMenuConfig';
import './market-product-list.less';
import Slider from 'react-slick';
import banner_1 from './images/banner_1.jpg';
import banner_2 from './images/banner_2.jpg';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default class MarketProductList extends Component {
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
  };

  componentDidMount() {
    this.getProductList();
    this.getCategoryMenu();
  }
  render() {
    return (
      <>
        <Slider {...settings}>
          <div>
            <img src={banner_1} alt='banner1' />
          </div>
          <div>
            <img src={banner_2} alt='banner2' />
          </div>
        </Slider>
        <MidNav
          menuList={this.state.categoriesMenu}
          marketMenu={MARKET_MENU}
          marketMenuDetail={MARKET_MENU_DETAIL}
        />
        <MarketContainer products={this.state.products} />
      </>
    );
  }
}
