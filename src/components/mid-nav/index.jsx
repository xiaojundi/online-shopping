import React, { Component } from 'react';
import { Menu, Icon, Tooltip, Button } from 'antd';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/market/actions';
import './index.less';
const { SubMenu } = Menu;

class MidNav extends Component {
  state = {
    current: 'mail',
    menuList: [],
    MARKET_MENU: {},
    MARKET_MENU_DETAIL: {},
  };

  getbMenu = (menu, menuName) => {
    if (!menu[menuName]) {
      return;
    }
    return Object.keys(menu[menuName]).map((item, index) => {
      return (
        <div className='mid-nav-menu' key={item}>
          <h1>
            <strong>{item}</strong>
          </h1>
          {Object.keys(menu[menuName][item] || {}).map((subItem) => {
            return (
              <div
                key={subItem}
                onClick={() => {
                  this.props.selectCategory(subItem);
                }}
              >
                {subItem}
              </div>
            );
          })}
        </div>
      );
    });
  };

  componentDidMount(props) {
    console.log(props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      menuList: props.menuList,
      MARKET_MENU: props.marketMenu,
      MARKET_MENU_DETAIL: props.marketMenuDetail,
    });
  }

  render() {
    return (
      <div className='mid-nav'>
        {Object.keys(this.state.MARKET_MENU).map((menuName) => {
          return (
            <Tooltip
              key={menuName}
              placement='bottom'
              title={this.getbMenu(this.state.MARKET_MENU_DETAIL, menuName)}
            >
              <Button>{menuName}</Button>
            </Tooltip>
          );
        })}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    market: state.market,
  }),
  { selectCategory }
)(MidNav);
