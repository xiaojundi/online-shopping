import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MarketProductList from '../market-product-list/market-product-list';
import ShoppingCartList from '../shopping-cart-list/shopping-cart-list';
import MarketProductDetail from '../market-product-detail/market-product-detail';
import Header from '../../components/header';
import PageFooter from '../../components/footer';
import { Layout } from 'antd';

const { Content } = Layout;

export default class Market extends Component {
  render() {
    return (
      <Layout className='market'>
        <Header />
        <Content>
          <Switch>
            <Route
              path='/market/marketproductlist'
              component={MarketProductList}
            />
            <Route
              path='/market/marketproductdetail'
              component={MarketProductDetail}
            />
            <Route
              path='/market/shoppingcartlist'
              component={ShoppingCartList}
            />
            <Route component={MarketProductList} />
          </Switch>
        </Content>
        <PageFooter />
      </Layout>
    );
  }
}
