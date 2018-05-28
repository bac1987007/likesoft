/**
 * Created by zhang on 2017/12/17.
 */
import React from 'react';
import { connect } from 'dva';
import { Table, Input, Popconfirm, Button,Icon } from 'antd';
import YangpinModel from './qualityConfigModel';
import styles from './EPatrol.css';
// 表格结构
class yangpinTable extends React.Component {
  constructor(props) {
    super(props);
    const checkItemId = this.props;
    this.columns = [{
      title: '样品类型',
      dataIndex: 'specTypeCn',
      key: 'specType',
      width: '15%',
      // render: (text, record, index) => this.renderColumns(this.state.data, index, 'ckPart', text),
    }, {
      title: '质检类型',
      dataIndex: 'qiTypeCn',
      key: 'qiType',
      width: '15%',
      //  render: (text, record, index) => this.renderColumns(this.state.data, index, 'checkItem', text),
    }, {
      title: '质检项目代码',
      dataIndex: 'qiItemCode',
      key: 'qiItemCode',
      width: '15%',
    }, {
      title: '质检项目名称',
      dataIndex: 'qiItemName',
      key: 'qiItemName',
      width: '15%',
    }, {
      title: '最大范围',
      dataIndex: 'normalMax',   //rangeMax
      key: 'normalMax',
      width: '10%',
    },  {
      title: '最小范围',
      dataIndex: 'normalMix',  //rangeMix
      key: 'normalMix',
      width: '10%',
    }, {
      title: '操作',
      dataIndex: 'checkItemId',
      key: 'checkItemId',
      render: (text, record, index) => {
        const deleCheckItemId = record.recId;
        return (
          <div>
            <YangpinModel title={<Icon type="edit" />} index={index} checkItemId={record.recId} className={styles.DeviceMLeft} />
            <Popconfirm title="确定删除吗?" onConfirm={() => this.deleteModalInfo(deleCheckItemId)}>
              <Button type="danger" className={styles.DeviceMLeft}><Icon type="delete" /></Button>
            </Popconfirm>
          </div>
        );
      },
    }];
  };
  //删除方法
  deleteModalInfo = (deleCheckItemId) => {
    this.props.dispatch({
      type: 'EPatrol/deleYangpin',
      payload: {
        recId: deleCheckItemId,
      },  // 参数传递
    });
  };

  //查询yangpin列表的方法 (参数暂时未传)
  getyangpin = () => {
    this.props.dispatch({
      type: 'EPatrol/getyangpinConfig',
      payload: {

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
  // 加载完成后执行数据列表查询
  componentDidMount() {
    this.getyangpin();
    this.ypType();
  }
  render() {
    const { pagination, loading,yangpinTable } = this.props.EPatrol;
    const dataSource = yangpinTable;  // listCon
    const columns = this.columns;
    return (
      <div style={{padding:20}}>
        <div className={styles.DeviceHeader}>
          {/* 新增弹出*/}
          <YangpinModel title="新增"/>
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

