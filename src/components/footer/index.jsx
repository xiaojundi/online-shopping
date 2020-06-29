import React, { Component } from 'react';
import { Layout } from 'antd';
import './index.less';

const { Footer } = Layout;
export default function () {
  return (
    <Footer>
      <div className='footer-link'>
        <div className='parts'>
          <p className='title active'>帮助中心</p>
          <p>
            <a href='https://www.tntsupermarket.com/faq/'>常见问题</a>
          </p>
          <p>
            <a href='https://www.tntsupermarket.com/contactus/'>联系我们</a>
          </p>
        </div>
        <div className='parts'>
          <p className='title active'>用户指南</p>
          <p>
            <a href='https://www.tntsupermarket.com/faq/'>常见问题</a>
          </p>
          <p>
            <a href='https://www.tntsupermarket.com/contactus/'>联系我们</a>
          </p>
        </div>
        <div className='parts'>
          <p className='title active'>付款预交货</p>
          <p>
            <a href='https://www.tntsupermarket.com/faq/'>常见问题</a>
          </p>
          <p>
            <a href='https://www.tntsupermarket.com/contactus/'>联系我们</a>
          </p>
        </div>
        <div className='parts'>
          <p className='title active'>关于我们</p>
          <p>
            <a href='https://www.tntsupermarket.com/faq/'>常见问题</a>
          </p>
          <p>
            <a href='https://www.tntsupermarket.com/contactus/'>联系我们</a>
          </p>
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='footer-bottom-content'>
          <small className='copyright'>
            <span>© 1993-2020. T&amp;T Supermarket, All Rights Reserved.</span>
          </small>{' '}
          <div className='privacy-policy'>
            <dl>
              <dd className='privacy'>
                <a
                  href='https://www.tntsupermarket.com/privacy-policy/'
                  title='隐私政策'
                  target='_blank'
                >
                  <span>隐私政策</span>
                </a>
              </dd>
              <dd className='terms-use'>
                <a
                  href='https://www.tntsupermarket.com/terms-conditions/'
                  title='条款和条件'
                  target='_blank'
                >
                  <span>条款和条件</span>
                </a>
              </dd>
            </dl>
          </div>
          <div className='clear'></div>
        </div>
      </div>
    </Footer>
  );
}
