/**
 * Created by zhang on 2017/12/17.
 */
import React from 'react';
import { connect } from 'dva';
import { Table, Input, Popconfirm, Button,Icon } from 'antd';
import JieyangEpModel from './qualityListModel';
import { routerRedux } from 'dva/router';
import styles from './EPatrol.css';

// let specId = '';
// let specBatch = '';
// let  specName = '';
// let specType ='';
// let qiUser ='';

// 表格结构
class yangpinTable extends React.Component {
  constructor(props) {
    super(props);
    const checkItemId = this.props;
    this.columns = [{
      title: '样品批号/编码',
      dataIndex: 'specBatch',
      width: '20%',
      // render: (text, record, index) => this.renderColumns(this.props.dataList, index, 'deviceCode', text),
    }, {
      title: '名称',
      dataIndex: 'specName',
      width: '20%',
      // render: (text, record, index) => this.renderColumns(this.props.dataList, index, 'nameModel', text),
    }, {
      title: '采集时间',
      dataIndex: 'collectDttm',
      width: '15%',
      // render: (text, record, index) => this.renderColumns(this.props.dataList, index, 'deptId', text),
    }, {
      title: '质检状态',
      dataIndex: 'qiStatus',
      width: '15%',
      // render: (text, record, index) => this.renderColumns(this.props.dataList, index, 'deptId', text),
    },  {
      title: '质检人',
      dataIndex: 'qiUser',
      width: '15%',
      // render: (text, record, index) => this.renderColumns(this.props.dataList, index, 'deptId', text),
    }, {
      title: '操作',
      dataIndex: 'checkItemId',
      key: 'checkItemId',
      render: (text, record, index) => {
        console.log(record);

        return (
          <div>
            <JieyangEpModel title={<Icon type="edit" />} index={index} checkItemId={record.specId} className={styles.DeviceMLeft} />
            <Popconfirm title="确定删除吗?" onConfirm={() => this.deleteModalInfo(record.specId)}>
              <Button type="danger" className={styles.DeviceMLeft}><Icon type="delete" /></Button>
            </Popconfirm>
            <Button type="primary" className={styles.DeviceMLeft} onClick={() => this.goToAgencyUpgrade( record.specId, record.specBatch,record.specName,record.specType,record.collectDttm)}>质检记录</Button>
          </div>
        );
      },
    }];
  };

  // 跳转详情页
  goToAgencyUpgrade = (specId,specBatch,specName,specType,collectDttm) => {
    localStorage.removeItem('specId');
    localStorage.setItem('specId', specId);
    localStorage.removeItem('specBatch');
    localStorage.setItem('specBatch', specBatch);
    localStorage.removeItem('specName');
    localStorage.setItem('specName', specName);
    localStorage.removeItem('specType');
    localStorage.setItem('specType', specType);
    localStorage.removeItem('collectDttm');
    localStorage.setItem('collectDttm', collectDttm);
    this.props.dispatch(routerRedux.push({
      pathname: '/qualityRecord',
      query: {
        specId: specId,
        specBatch:specBatch,
        specName:specName,
        specType:specType,
        collectDttm:collectDttm
      },
    }));
  };
  //删除方法
  deleteModalInfo = (deleCheckItemId) => {
    this.props.dispatch({
      type: 'EPatrol/deljieyangTab',
      payload: {
        specId:deleCheckItemId,
      },
    });
  };
  //查询样品类型
  ypType = () => {
    this.props.dispatch({
      type: 'EPatrol/ypType',
      payload: {},
    });
  };
// 查询
  handlequeryZjList = () => {
    const specName = this.props.EPatrol.specName;
    const specBatch = this.props.EPatrol.specBatch;
    this.props.dispatch({
      type: 'EPatrol/queryZjListSerch',
      payload: {
        specName: specName || '',
        specBatch: specBatch || '',
        pageNum: '10',
        currentPage: '1',
      },
    });
  };
  // 质检列表查询时input输入框的样品批号/编码值
  handleInputChange = (e) => {
    const specBatch = e.target.value;
    this.props.dispatch({
      type: 'EPatrol/ypTypeMeth',
      payload: { specBatch },
    });
  };
  // 质检列表查询时input输入框的样品名称值
  handleInputChange2 = (e) => {
    const specName = e.target.value;
    this.props.dispatch({
      type: 'EPatrol/ypTypeMeth',
      payload: { specName },
    });
  };
  componentDidMount(){
    this.handlequeryZjList();
    this.ypType();
  }
  render() {
    const { pagination, loading ,queryZjListData } = this.props.EPatrol;
    const dataSource = queryZjListData;
    const columns = this.columns;
    return (
      <div style={{padding:20}}>
        <div className={styles.DeviceHeader}>
          <span>样品批号/编码:</span>
            <Input placeholder="样品批号/编码" className={styles.einput} onChange={this.handleInputChange} />
          <span>样品名称:</span>
            <Input placeholder="样品名称" className={styles.einput} onChange={this.handleInputChange2} />
          <Button icon="search" onClick={this.handlequeryZjList} className={styles.workOrderGrop}>查询</Button>
          <JieyangEpModel title="接样" className={styles.workOrderGrop}/>
        </div>
        <Table
          bordered
          dataSource={dataSource}
          rowKey={record => record.recId}
          columns={columns}
          pagination={pagination}
          loading={loading}
        />
      </div>
    );
  }
}
//model中的namespace
function mapStateToProps(EPatrol) {
  return EPatrol;
}
//抛出组件
export default connect(mapStateToProps)(yangpinTable);

