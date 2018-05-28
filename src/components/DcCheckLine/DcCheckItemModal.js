/**
 * Created by lizhipeng on 2017/7/20.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Table, Modal, message, Input, Button } from 'antd';
import styles from './DcCheckLine.less';

class DcCheckItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      ckSearchItemList: [],
      selectItems: [],
      ckLineItemKeys: [],
    };
  }

  handleChange = (e) => {
    const val = e.target.value;
    this.setState({
      searchVal: val,
    });
  }
  handleSearch =() => {
    const { dispatch } = this.props;
    const val = this.state.searchVal;
    if (val.trim() === '') {
      message.error('请输入设备编码');
      return false;
    }
    dispatch({
      type: 'DcCheckLine/queryItemList',
      payload: {
        deviceCode: val,
        self: this,
      },
    });
  };
  handleSave = () => {
    const { dispatch, parentModal, DcCheckLine } = this.props;
    const { ckLineItems, ckLineItemIds } = DcCheckLine;
    const { selectItems } = this.state;
    const params = ckLineItems.concat(selectItems);
    selectItems.map((item) => {
      if (ckLineItemIds.indexOf(item.checkItemId) < 0) {
        ckLineItems.push(item);
        ckLineItemIds.push(item.checkItemId);
      }
      return null;
    });
    dispatch({
      type: 'DcCheckLine/update',
      payload: { ckLineItems: params },
    });
    parentModal.setState({
      itemView: false,
    });
    this.hideModal();
  };
  handleCancel = () => {
    const { parentModal } = this.props;
    parentModal.setState({
      itemView: false,
    });
    this.hideModal();
  };
  hideModal = () => {
    this.setState({
      searchVal: '',
      ckSearchItemList: [],
      selectItems: [],
      ckLineItemKeys: [],
    });
  }
  render() {
    const { DcCheckLine, visible } = this.props;
    const { dcItemModalShowLoading, ckLineItemIds } = DcCheckLine;
    const columns = [{
      title: '项目名称',
      dataIndex: 'checkItem',
    },
    ];
    const dataSources = [];
    this.state.ckSearchItemList.map((item, i) => {
      const result = item;
      result.key = i;
      return dataSources.push(result);
    });
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          ckLineItemKeys: selectedRowKeys,
          selectItems: selectedRows,
        });
      },
      selectedRowKeys: this.state.ckLineItemKeys,
      getCheckboxProps: record => ({
        disabled: ckLineItemIds.indexOf(record.checkItemId) > -1,
      }),
    };
    return (
      <Modal
        visible={visible}
        maskClosable={false}
        onOk={this.handleSave.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        okText="保存" cancelText="取消"
      >
        <Spin
          spinning={dcItemModalShowLoading}
          tip="加载中..."
        >
          <div>
            设备编码:
            <Input type="text" style={{ width: '150px' }} className={styles.ml10} value={this.state.searchVal} onChange={this.handleChange} />
            <Button
              className={styles.ml10}
              type="primary"
              size="small"
              onClick={this.handleSearch}
            >
              查询
            </Button>
          </div>
          <Table bordered size="small" rowSelection={rowSelection} dataSource={dataSources} columns={columns} />
        </Spin>
      </Modal>
    );
  }
}

function mapStateToProps(DcCheckLine) {
  return DcCheckLine;
}


export default connect(mapStateToProps)(DcCheckItemModal);
