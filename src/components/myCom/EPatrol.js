/**
 * Created by zhangfuchuan on 2017/7/13.
 * // .--,       .--,
 //  ( (  \.---./  ) )
 //   '.__/o   o\__.'
 //      {=  ^  =}
 //       >  -  <
 //      /       \
 //     //       \\
 //    "'\       /'"_.-~^`'-.
 //       \  _  /--'         `
 //     ___)( )(___
 //    (((__) (__)))    高山仰止,景行行止.虽不能至,心向往之。
 */

import React from 'react';
import { connect } from 'dva';
import { Table, Input, Popconfirm, Button,Icon } from 'antd';
import LocalizedModal from './LocalizedModal';
import styles from './EPatrol.css';
// 表格结构
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    const checkItemId = this.props;
    this.columns = [{
      title: '巡检部位',
      dataIndex: 'ckPart',
      key: 'ckPart',
      width: '35%',
     // render: (text, record, index) => this.renderColumns(this.state.data, index, 'ckPart', text),
    }, {
      title: '内容及项目',
      dataIndex: 'checkItem',
      key: 'checkItem',
      width: '35%',
    //  render: (text, record, index) => this.renderColumns(this.state.data, index, 'checkItem', text),
    }, {
      title: '状态',
      dataIndex: 'itemStatusCn',
      key: 'itemStatusCn',
      width: '10%',
    }, {
      title: '操作',
      dataIndex: 'checkItemId',
      key: 'checkItemId',
      render: (text, record, index) => {
        const deleCheckItemId = record.checkItemId;
        return (
          <div>
            <LocalizedModal title={<Icon type="edit" />} index={index} checkItemId={record.checkItemId} className={styles.DeviceMLeft} />
            <Popconfirm title="确定删除吗?" onConfirm={() => this.deleteModalInfo(deleCheckItemId)}>
              <Button type="danger" className={styles.DeviceMLeft}><Icon type="delete" /></Button>
            </Popconfirm>
          </div>
        );
      },
    }];
  }
  deleteModalInfo = (deleCheckItemId) => {
    this.props.dispatch({
      type: 'EPatrol/deleteDcitem',
      payload: {
        checkItemId: deleCheckItemId,
      },  // 参数传递
    });
  };
  // 加载完成后执行数据列表查询
  componentDidMount() {
    const deviceId = localStorage.getItem('deviceId');
    this.props.dispatch({
      type: 'EPatrol/refreshDeviceId',
      payload: {
        deviceId,
      },
    });
    this.handleQuery(deviceId);
  }
  handleQuery = (deviceId) => {
    this.props.dispatch({
      type: 'EPatrol/getDcitem',
      payload: {
        deviceId,
      },
    });
  };

  render() {
    const { epDataList, pagination, loading } = this.props.EPatrol;
    const dataSource = [];  // listCon
    if(epDataList){
      epDataList.map((data, index) => {
        const result = data;
        result.key=index;
        return dataSource.push(result);
      });
    }
    const columns = this.columns;
    return (
      <div style={{padding:20}}>
        <div className={styles.DeviceHeader}>
          <h2 data-orgId={this.props.EPatrol.orgId} >组织机构代码</h2>
          <h2 className="DeviceHeaderHide" data-deviceId={this.props.EPatrol.deviceId} >设备ID</h2>
          <span>编码:</span>
          <Input value={this.props.EPatrol.deviceCode} className={styles.DeviceInput} disabled={true} />
          <span className={styles.DeviceMLeft}>名称:</span>
          <Input value={this.props.EPatrol.nameModel} className={styles.DeviceInput} disabled={true}/>
          {/* 新增弹出*/}
          <LocalizedModal title="新增"/>
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
export default connect(mapStateToProps)(EditableTable);

