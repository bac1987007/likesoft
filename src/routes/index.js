/**
 * Created by zhangfuchuan on 2017/7/25.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Util, AntModal, MockData } from '../utils/CommonUtil';
import { Menu, Icon, Button, Layout, BackTop, Input, Select } from 'antd';
import styles from './index.css';
import MainContent from './indexMain';

const SubMenu = Menu.SubMenu;
const { Header, Sider, Content } = Layout;
const Search = Input.Search;

// 角色定义
const LD = 'LD';
const MANAGER = 'MANAGER';
const XJY = 'XJY';
const ZJBZ = 'ZJBZ';
const WXG = 'WXG';

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  // 获取菜单
  getIndexMenu = () => {
    this.props.dispatch({
      type: 'EPatrol/getIndexMenu',
      payload: {},
    });
  };
  // 获取登录信息
  getLoginMsg = () => {
    this.props.dispatch({
      type: 'EPatrol/getLoginMsg',
      payload: {},
    });
  };
  // 登出
  logoutFun = () => {
    this.props.dispatch({
      type: 'EPatrol/logoutFun',
      payload: {},
    });
    location.reload();
  };
  componentDidMount() {
    this.getLoginMsg();
    this.getIndexMenu();
  }
  render() {
    const { LoginMsg, menuList } = this.props.EPatrol;
    const userType = LoginMsg.userType;
    const Option = Select.Option;
    if (menuList == undefined || menuList == '' || menuList == null) {
      return (<div />);
    }
    function handleChange(value) {
      // console.log(`selected ${value}`);
    }
    function handleBlur() {
      // console.log('blur');
    }
    function handleFocus() {
      // console.log('focus');
    }
    let imgPath1 = "./img/log.png";
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={styles.titDiv}>
            <img src={imgPath1}/>
            <a className={styles.titP} href="http://baidu.com" target="_blank">万年青水泥</a>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            {menuList.map((menu) => {
              if (menu.menus == null) {
                return (<Menu.Item key={menu.menuId} ><Link to={menu.menuId} target="_self"><img src={menu.menuIcon} style={{ marginBottom: -3 }}/><span style={{ marginLeft: 25 }}>{menu.menuCn}</span></Link></Menu.Item>);
              }
              else if (userType && userType != undefined && userType != '' && userType != null) {
                if (userType == XJY || userType == WXG) {
                  return (<div />);
                }
                else if (userType == LD) {
                  return (
                    <SubMenu key={menu.menuId} title={<span><img src={menu.menuIcon} style={{ marginBottom: -3 }}/><span style={{ marginLeft: 25 }}>{menu.menuCn}</span></span>}>
                      {menu.menus.map((menuChild) => {
                        return (<Menu.Item key={menuChild.menuId} ><Link to={menuChild.menuId} target="_self"><img src={menuChild.menuIcon} style={{ marginBottom: -3 }}/><span style={{ marginLeft: 25 }}>{menuChild.menuCn}</span></Link></Menu.Item>);
                      },
                        )}
                    </SubMenu>
                  );
                }
                else if (userType == ZJBZ) {
                  return (
                    <SubMenu key={menu.menuId} title={<span><img src={menu.menuIcon} style={{ marginBottom: -3 }}/><span style={{ marginLeft: 25 }}>{menu.menuCn}</span></span>}>
                      {menu.menus.map((menuChild) => {
                          if (userType == ZJBZ && (menuChild.menuId == 'ZJGL' || menuChild.menuId == 'ZJ' || menuChild.menuId == 'JBZL' || menuChild.menuId == 'XTSZ')) {
                            return (<Menu.Item key={menuChild.menuId} ><Link to={menuChild.menuId} target="_self"><img src={menuChild.menuIcon} style={{ marginBottom: -3 }}/><span style={{ marginLeft: 25 }}>{menuChild.menuCn}</span></Link></Menu.Item>);
                          }
                        },
                        )}
                    </SubMenu>
                  );
                }
                else if (userType == MANAGER) {
                  return (
                    <SubMenu key={menu.menuId} title={<span><img src={menu.menuIcon} style={{ marginBottom: -3 }}/><span style={{ marginLeft: 25 }}>{menu.menuCn}</span></span>}>
                        {menu.menus.map((menuChild) => {
                          if (userType == MANAGER && menuChild.menuId == 'XJXLGL' && menuChild.roleId == 'MANAGER') {
                            return (<Menu.Item key={menuChild.menuId} ><Link to={menuChild.menuId} target="_self"><img src={menuChild.menuIcon} style={{ marginBottom: -3 }}/><span style={{ marginLeft: 25 }}>{menuChild.menuCn}</span></Link></Menu.Item>);
                          }
                        },
                        )}
                      </SubMenu>
                  );
                }
              }
            })}
          </Menu>
          <div className={styles.titDiv}>
            <img src={imgPath1}/>
            <p className={styles.titP}>啄木鸟管理系统</p>
          </div>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Icon
              className={styles.headericon}
              style={{ fontSize: 20 }}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请输入查询内容"
              optionFilterProp="children"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={styles.headerSearch}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="sbgl-wxjl">设备管理-维修记录</Option>
              <Option value="sbgl-jxjh">设备管理-检修计划</Option>
              <Option value="sbgl-sbda">设备管理-设备档案</Option>
              <Option value="rhgl-rhgl">润滑管理-润滑管理</Option>
              <Option value="rhjh-rhjh">润滑管理-润滑计划</Option>
              <Option value="xjjd">巡检监督</Option>
              <Option value="ycgd">异常工单</Option>
              <Option value="RMzk">KM智库</Option>
              <Option value="wgtj">违规统计</Option>
              <Option value="xtgl-xjxtgl">系统管理-巡检系统管理</Option>
              <Option value="xtgl-zhgl">系统管理-账号管理</Option>
            </Select>
            <Button className={styles.icon1} shape="circle" icon="logout" size="large"/>
            <Button className={styles.icon1} shape="circle" icon="user" size="large"/>
            <Button className={styles.icon1} shape="circle" icon="notification" size="large"/>
            <Button className={styles.icon1} shape="circle" icon="export" size="large"/>
          </Header>
          <MainContent children={this.props.children} />
          {/* <BackTop visibilityHeight="100"/>*/}
        </Layout>
      </Layout>
    );
  }
}


function mapStateToProps(EPatrol) {
  return EPatrol;
}
export default connect(mapStateToProps)(SiderDemo);
