'use strict';

import React, {Component, PropTypes} from 'react';
import {routerRedux, Link} from 'dva/router';
import {connect} from 'dva';

import {Menu, Icon, Switch} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import styles from './Home.less';

//MainMenu
class MainMenu extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // menus: menuStore.getMenus(),
            current: '1',
            theme  : 'light', //light,dark
        };
    }

    handleClick = (e)=> {
        this.setState({
            current: e.key,
        });
    }

    getSubListDom(subMenu) {
        return subMenu.map((subItem, subIndex)=> {
            let url = subItem.menuUrl.split('#')[1];
            return (
                <Menu.Item key={subItem.menuCode}
                >
                    <Link to={url} target='_self'
                          className={styles.sidebarFont_2}
                    >{subItem.menuName} </Link>
                </Menu.Item>
            )
        })
    }

    render() {

        const self = this;

        const {dispatch, menuList} = this.props;


        let menuListDom = menuList.map((item, index)=> {
            if (item && item.subMenu) {
                if (item.subMenu.length == 0) {
                    let url = item.menuUrl.split('#')[1];
                    url = url.split("')")[0];
                    return (
                        <Menu.Item key={item.menuCode}
                        >
                            <Link to={url} target='_self'
                                  className={styles.sidebarFont_1+' '+styles.arrow}
                            >
                                <Icon type="home"/>{item.menuName}
                            </Link>

                        </Menu.Item>
                    );
                } else {
                    let subListDom = self.getSubListDom(item.subMenu);
                    let icon = '';
                    switch (item.menuName) {
                        case '商品管理':
                            icon = <Icon type="switcher"/>;
                            break;
                        case '代理管理':
                            icon = <Icon type="user"/>;
                            break;
                        case '订单管理':
                            icon = <Icon type="file-text"/>;
                            break;
                        case '财务管理':
                            icon = <Icon type="calculator"/>;
                            break;
                        case '系统管理':
                            icon = <Icon type="setting"/>;
                            break;
                    }
                    return (
                        <SubMenu key={item.menuCode}
                                 title={
                                     <span className={styles.sidebarFont_1}>
                                         <span>{icon}</span>
                                         {item.menuName}
                                 </span>}
                        >{subListDom}
                        </SubMenu>
                    )
                }

            }
        })

        return (
            <div className="sidebar-menu ">


                <Menu onClick={this.handleClick}
                      theme={this.state.theme}
                      style={{width: 240}}
                      defaultOpenKeys={['sub1']}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                >
                    {menuListDom}
                </Menu>
            </div>
        );
    }
}

// function mapStateToProps({Common}) {
//     return {Common};
// }

export default MainMenu;

