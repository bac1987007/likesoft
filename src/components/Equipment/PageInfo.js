/**
 * Created by lawliet on 2017/7/19.
 */
/*
 * by 2017-7-12  jack
 * */
import React  from 'react';
import { connect } from 'dva';
import { Pagination } from 'antd';

// let thispage;
// console.log(this.props.deviceManagement.total);
class PageInfo extends React.Component {

  onChange = (page) => {
  //  thispage = page;
    this.props.dispatch({
      type: 'deviceManagement/upload',
      payload: { current: page },
    });
    this.props.dispatch({
      type: 'deviceManagement/query',
      payload: {
        data: {
          deviceCode: '',
          deptId: '',
          pageNum: '10',
          currentPage: page,

        },
      },
    });
  }
  render() {
    const thispage=this.props.deviceManagement.current;
    return <Pagination current={thispage || 1} onChange={this.onChange} total={this.props.deviceManagement.total ? this.props.deviceManagement.total : 10} />;
  }
}
// 与model层建立数据联系
function mapStateToProps(deviceManagement) {
  return deviceManagement;
}

// const deviceManagementForm = Form.create()(deviceManagement);

export default connect(mapStateToProps)(PageInfo);
