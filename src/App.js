import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import Market from './pages/market/market';
import MarketProductDetail from './pages/market-product-detail/market-product-detail';

/*
应用的根组件
 */
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {/*只匹配其中一个*/}
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' component={Admin}></Route>
          {/* <Route
            path='/marketproductdetail'
            component={MarketProductDetail}
          ></Route> */}
          <Route path='/market' exact component={Market}></Route>
          <Route component={Market}></Route>
        </Switch>
      </HashRouter>
    );
  }
}
