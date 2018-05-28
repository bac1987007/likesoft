/**
 * Created by lizhipeng on 2017/7/19.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Icon, Popconfirm } from 'antd';
import DcCheckLineModal from './DcCheckLineModal';
import styles from './DcCheckLine.less';

// const Option = Select.Option;

class DcCheckLineInitTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      record: {},
    };
  }
  handleEdit = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'DcCheckLine/detailCheckLine',
      payload: { record, self: this },
    });
  };
  // 列表删除
  handleDeleteConfirm = (record) => {
    this.props.dispatch({
      type: 'DcCheckLine/deleteCheckLine',
      payload: { record },
    });
  };
  handleModalCancel = () => {
    this.setState({
      editModal: false,
      record: {},
    });
    this.props.dispatch({
      type: 'DcCheckLine/update',
      payload: { ckLineItems: [] },
    });
  };
  render() {
    const { checkLineList, checkLinePeriod } = this.props.DcCheckLine;
    const columns = [{
      title: '线路名称',
      dataIndex: 'checkLineName',
    }, {
      title: '归属部门',
      dataIndex: 'deptCn',
    }, {
      title: '岗位',
      dataIndex: 'ckRoleCn',
    }, {
      title: '周期',
      dataIndex: 'ckPeriod',
      render: (text, record) => {
        const period = record.ckPeriod;
        return (
          <span>{`${checkLinePeriod[period]} + ${record.ckTime}`}</span>
        );
      },
    }, {
      title: '操作 ',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div>
            <Button
              className={styles.ml10}
              type="primary"
              size="small"
              id="edit"
              onClick={() => this.handleEdit(record)}
            >
              <Icon type="edit" />
            </Button>
            <Popconfirm title="确认删除?" onConfirm={() => this.handleDeleteConfirm(record)} okText="确认" cancelText="取消">
              <Button
                className={styles.ml10}
                type="primary"
                size="small"
                id="delete"
              >
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    }];
    const dataSources = [];
    if(checkLineList.length<=0){
      $(".DcShow").hide();
    }else{
      checkLineList.map((data, i) => {
        const result = { ...data };
        result.key = i;
        return dataSources.push(result);
      });
    }
    return (
      <div>
        <Table bordered size="small" dataSource={dataSources} columns={columns} />
        <DcCheckLineModal
          className="DcShow"
          visible={this.state.editModal}
          onCancel={this.handleModalCancel}
          record={this.state.record}
        />
      </div>
    );
  }
}

function mapStateToProps(DcCheckLine) {
  return DcCheckLine;
}

export default connect(mapStateToProps)(DcCheckLineInitTable);
