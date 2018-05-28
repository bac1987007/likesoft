/**
 * Created by Administrator on 2017/7/25.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'dva';
import { Util, AntModal, MockData } from '../utils/CommonUtil';
import { Menu, Icon, Button ,Layout,BackTop} from 'antd';
const SubMenu = Menu.SubMenu;
const { Header, Sider, Content } = Layout;
var ReactDOM = require('react-dom');
import styles from './index.css';

export default class MainContent extends Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.mainContent)).css({
      height  : $(window).height(),
      overflow: 'auto',
      overflowX: 'hidden',
    });

    // $(ReactDOM.findDOMNode(this.refs.mainContentImg)).css({
    //   height  : $(window).height()-120,
    //   overflow: 'auto',
    //   overflowX: 'hidden',
    // });

    $(window).resize(function () {
      $(ReactDOM.findDOMNode(this.refs.mainContent)).css({
        height  : $(window).height(),
        overflow: 'auto',
        overflowX: 'hidden',
      });
    }.bind(this));
  }

  render() {
    return (
      <div style={{ margin: '0', background: '#f2f2f2'}} ref="mainContent">
        {this.props.children}
        {/*<img src="http://seopic.699pic.com/photo/50035/8104.jpg_wh1200.jpg" ref="mainContentImg"/>*/}
        <BackTop visibilityHeight={0}/>
      </div>
    );
  }
};


//
// const ContentInfo = (props)=>(
//   <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 600 }}>
//     {props.children}
//   </Content>
// );
// export default ContentInfo
