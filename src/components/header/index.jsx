import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';

import LinkButton from '../link-button';
import { reqWeather } from '../../api';
import menuList from '../../config/menuConfig';
import { formateDate } from '../../utils/dateUtils';
import { logout } from '../../redux/actions';
import Register from '../../pages/register/register';
import ShoppingCart from '../../components/shopping-cart/shopping-cart';
import './index.less';

export const menu = (
  <Menu>
    <Menu.Item>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='http://www.alipay.com/'
      >
        我的账户
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='http://www.taobao.com/'
      ></a>
    </Menu.Item>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='http://www.tmall.com/'>
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </Menu>
);

/*
头部导航的组件
 */
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
    dayPictureUrl: '', // 天气图片url
    weather: '', // 天气的文本
    registerVisible: false,
  };

  showModal = () => {
    this.setState({
      registerVisible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      registerVisible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      registerVisible: false,
    });
  };

  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };

  getWeather = async () => {
    // 调用接口请求异步获取数据
    const { dayPictureUrl, weather } = await reqWeather('北京');
    // 更新状态
    this.setState({ dayPictureUrl, weather });
  };

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === path) {
        // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title;
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        );
        // 如果有值才说明有匹配的
        if (cItem) {
          // 取出它的title
          title = cItem.title;
        }
      }
    });
    return title;
  };

  goToHomePage = () => {
    this.props.history.push('/admin/home');
  };

  /*
  退出登陆
   */
  logout = () => {
    // 显示确认框
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        console.log('OK', this);
        this.props.logout();
      },
    });
  };

  register = () => {};

  login = () => {
    this.props.history.push('/login');
  };

  /*
  第一次render()之后执行一次
  一般在此执行异步操作: 发ajax请求/启动定时器
   */
  componentDidMount() {
    // 获取当前的时间
    this.getTime();
    // 获取当前天气
    this.getWeather();
  }
  /*
  // 不能这么做: 不会更新显示
  componentWillMount () {
    this.title = this.getTitle()
  }*/

  /*
  当前组件卸载之前调用
   */
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId);
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state;

    const username = this.props.user.username;

    // 得到当前需要显示的title
    // const title = this.getTitle()
    const title = this.props.headTitle;
    return (
      <div className='header'>
        <Modal
          title='注册'
          visible={this.state.registerVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Register />
        </Modal>
        <div className='header-top'>
          <div className='header-top-left'>
            <LinkButton onClick={this.logout}>关于我们</LinkButton>
            <LinkButton onClick={this.logout}>联系我们</LinkButton>
            <LinkButton onClick={this.logout}>商家咨询</LinkButton>
          </div>
          <div className='header-top-right'>
            {username ? (
              <LinkButton onClick={this.goToHomePage}>
                <span>欢迎, {username}</span>
              </LinkButton>
            ) : (
              // <Dropdown overlay={menu}>
              //   <a
              //     className='ant-dropdown-link'
              //     onClick={(e) => e.preventDefault()}
              //   >
              //     <span>欢迎, {username}</span>
              //   </a>
              // </Dropdown>
              <LinkButton onClick={this.login}>登录</LinkButton>
            )}
            {username ? (
              <LinkButton onClick={this.logout}>退出</LinkButton>
            ) : (
              <LinkButton onClick={this.showModal}>注册</LinkButton>
            )}
          </div>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt='weather' />
            <span>{weather}</span>
            <ShoppingCart />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ headTitle: state.headTitle, user: state.user }),
  { logout }
)(withRouter(Header));
