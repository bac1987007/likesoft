/**
 * Created by zhang on 2017/12/17.
 */
import React from 'react';
import { connect } from 'dva';
import { Table, Input, Popconfirm, Button,Icon } from 'antd';
import QualityModify from './qualityModify'
import QualityLRModel from './qualityLRModel';
import styles from './EPatrol.css';
// 表格结构

let qiUser = '';
class yangpinTable extends React.Component {
  constructor(props) {
    super(props);
    const checkItemId = this.props;
    this.columns = [{
      title: '质检编码',
      dataIndex: 'specExecCode',
      key: 'specExecCode',
      width: '15%',
      //  render: (text, record, index) => this.renderColumns(this.state.data, index, 'checkItem', text),
    },{
      title: '质检时间',
      dataIndex: 'qiFinishDttm',
      key: 'qiFinishDttm',
      width: '10%',
      // render: (text, record, index) => this.renderColumns(this.state.data, index, 'ckPart', text),
    }, {
      title: '质检人',
      dataIndex: 'qiUser',
      key: 'qiUser',
      width: '10%',
      //  render: (text, record, index) => this.renderColumns(this.state.data, index, 'checkItem', text),
    }, {
      title: '质检结果',
      dataIndex: 'qiVal',
      key: 'qiVal',
      width: '15%',
    }, {
      title: '正常范围-最大',
      dataIndex: 'normalMax',
      key: 'normalMax',
      width: '10%',
    }, {
      title: '正常范围-最小',
      dataIndex: 'normalMix',
      key: 'normalMix',
      width: '10%',
    }, {
      title: '偏离方向',
      dataIndex: 'qiOffset',
      key: 'qiOffset',
      width: '15%',
    }, {
      title: '操作',
      dataIndex: 'checkItemId',
      key: 'checkItemId',
      render: (text, record, index) => {
        const recId = record.recId;
        const specId = record.specId;
        return (
          <div>
            <QualityModify title={<Icon type="edit" />} index={index} recId={record.recId} checkItemId={record.specId} className={styles.DeviceMLeft} />
            <Popconfirm title="确定删除吗?" onConfirm={() => this.deleteModalInfo(recId,specId)}>
              <Button type="danger" className={styles.DeviceMLeft}><Icon type="delete" /></Button>
            </Popconfirm>
          </div>
        );
      },
    }];
  }

  //删除方法
  deleteModalInfo = (recId,specId) => {
    this.props.dispatch({
      type: 'EPatrol/deleteZjData',
      payload: {
        recId: recId,
        specId:specId
      },
    });
  };
  // 加载完成后执行数据列表查询
  componentDidMount() {
    const specId = localStorage.getItem('specId');
    const specBatch = localStorage.getItem('specBatch');
    const specName = localStorage.getItem('specName');
    const specType = localStorage.getItem('specType');
    const collectDttm = localStorage.getItem('collectDttm');
    //更新带过来的属性至本地state
    this.props.dispatch({
      type: 'EPatrol/refreshDeviceId',
      payload: {
        zhijianSpecId:specId,
        zhijianSpecBatch:specBatch,
        zhijianSpecName:specName,
        zhijianSpecType:specType,
        zhijianCollectDttm:collectDttm
      },
    });
    this.handleQuery(specId);
  }
  //查询列表的方法
  handleQuery = (specId) => {
    this.props.dispatch({
      type: 'EPatrol/luZhijianTable',
      payload: {
        specId:specId,
      },
    });
  };
  render() {
    const { luZjTable, pagination, loading } = this.props.EPatrol;
    const dataSource = [];
    if(luZjTable){
      luZjTable.map((data, index) => {
        const result = data;
        result.key=index;
        return dataSource.push(result);
      });
    }
    const columns = this.columns;
    return (
      <div style={{padding:20}}>
        <div className={styles.DeviceHeader}>
          <QualityLRModel title="录入" />
        </div>
        <Table
          bordered
          dataSource={dataSource}
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

