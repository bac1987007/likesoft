/**
 * Created by zhaoxin on 2016/12/26.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import Domain from '../config/Domain';

// Components
var
    MainHeader = require('./MainHeader'),
    MainFooter = require('./MainFooter'),
    MainSidebar = require('./MainSidebar'),
    MainContent = require('./MainContent');

import styles from './Home.less';

class QbaoAdminApp extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.dispatch({
            type   : 'Common/getMenuList',
            payload: {},
        });

        this.props.dispatch({
            type   : 'Common/getLoginInfo',
            payload: {},
        });

    }

    render() {
        const {dispatch, Common:{menuList, menuList11, loginInfo}} = this.props;

        const logout = Domain.pgsba + '/logout.html';

        const sidebarProps = {
            dispatch,
            // menuList: menuList,
            menuList: menuList11,
        };

        const headerProps = {
            dispatch,
            loginInfo,
            logout,
        };

        return (
            <div className='wrapper font14'>
                <MainHeader {...headerProps}/>
                <MainSidebar {...sidebarProps}/>
                <MainContent children={this.props.children}/>
                <MainFooter />
            </div>
        );
    }
}

function mapStateToProps({Common}) {
    return {Common};
}

export default connect(mapStateToProps)(QbaoAdminApp);

