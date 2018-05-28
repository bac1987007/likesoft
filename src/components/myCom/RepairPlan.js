import React from "react";
import {connect} from "dva/index";
import styles from './repairPlan.css';
import { Col, Row,DatePicker, Select, Progress, Table, Button, Collapse, Icon } from 'antd';

class RepairPlan extends React.Component {
  render() {
    function render3() {
      return <input placeholder={"请输入..."} className={styles.ipt}></input>;
    }
    function render4() {
      return (
        <div className={styles.rend}>
          <Icon className={styles.block} type="delete" />
          <p className={styles.block1}>查看详情</p>
        </div>
      );
    }
    const columns = [ {
      title: '序号',
      dataIndex: 'xh',
    },
      {
      title: '设备',
      dataIndex: 'sb',
    }, {
      title: '部位',
      dataIndex: 'bw',
    }, {
      title: '故障说明',
      dataIndex: 'gzsm',
    }, {
      title: '发起人',
      dataIndex: 'wxcs',
    }, {
      title: '发起时间',
      dataIndex: 'fqsj',
    }, {
      title: '执行人',
      dataIndex: 'zxr',
      render: render3,
    }, {
      title: '计划完成时间',
      dataIndex: 'jhwcsj',
      render: render3,
    }, {
      title: '编辑',
      dataIndex: 'bj',
      render: render4,
    }];
    const data = [{
      key: '1',
      xh: '1',
      gzsm: '漏油',
      fqsj: '2017-9-2',
      sb: '石灰石称',
      bw: '减速机',
      wxcs: 12,
    } ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return(
      <div className={styles.mainh}>
        <div className={styles.shadow}>
          <div className={styles.headh}>
              <a className={styles.p1}>检修计划</a>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
      </div>
    )
  }
}
function mapStateToProps(repairPlan) {
  return repairPlan;
}

export default connect(mapStateToProps)(RepairPlan);
