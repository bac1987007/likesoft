'use strict';

import React, {Component} from 'react';
var ReactDOM = require('react-dom');
var _ = require('lodash');

import Domain from '../config/Domain';

import {Row, Col, Icon} from 'antd';
import styles from './Home.less';

class MainHeader extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            flag: 'true',
        }
    }

    toggleNavigation() {
        if (!this.state.flag) {
            $('body').removeClass('sidebar-collapse');
        } else {
            $('body').addClass('sidebar-collapse');
        }
        this.setState({flag: !this.state.flag});
    }

    render() {

        const {loginInfo, logout} = this.props;

        return (
            <header className={"main-header " + styles.new_main_header}>
                <div className={"logo " + styles.newLogo}>
                    <img src={require('./img/title.png')}/>

                    <a className={styles.toggle} style={{color: '#222'}}
                       onClick={this.toggleNavigation.bind(this)}
                    >
                        <Icon type="bars"/>
                    </a>


                    <a className={styles.txt} style={{width: '100px'}}
                       href={logout} target="_self"
                    >
                        <Icon type="poweroff"/>
                        退出
                    </a>

                    <span className={styles.txt} style={{width: '200px'}}>
                        <Icon type="user"/>
                        {loginInfo}&nbsp;欢迎进入
                    </span>
                </div>

                <div className={styles.main_header_title}></div>
            </header>
        );
    }
}

export default MainHeader;

