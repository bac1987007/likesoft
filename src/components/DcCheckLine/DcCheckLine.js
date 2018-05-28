/**
 * 巡检线路
 * Created by lizhipeng on 2017/7/19.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Col, Row, Select, Button, Spin } from 'antd';
import styles from './DcCheckLine.less';
import DcCheckLineInitTable from './DcCheckLineInitTable';
import DcCheckLineModal from './DcCheckLineModal';

const Option = Select.Option;

class DcCheckLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      record: {},
      formAdd:"",
    };
  }

  componentDidMount() {
    this.initCheckNames();
    //第一次进页面全部加载
    this.handleSearch();
  }
  // 获取部门列表
  // TODO orgId暂时写死
  initCheckNames() {
    this.props.dispatch({
      type: 'DcCheckLine/queryCheckNames',
      payload: {orgId: 'NJBH'},
    });
  }
  // 部门查询下拉选择框
  handleSelechChange = (deptId) => {
    this.setState({
      deptId,
    });
  };
  // 查询按钮
  handleSearch = () => {
    this.props.dispatch({
      type: 'DcCheckLine/queryInitCheckLineList',
      payload: { deptId: this.state.deptId },
    });
  };
  // 新增线路
  hanleCkLineAdd = () => {
    this.setState({
      addModal: true,
    });
  };
  handleModalCancel = () => {
    this.setState({
      addModal: false,
      record: {},
    });
  };

  render() {
    const { checkLineDepts, showLoading } = this.props.DcCheckLine;
    return (
      <Spin
        spinning={showLoading}
        tip="加载中..."
      >
        <Card title="巡检线路" bordered={false}>
          <Row>
            <Col>
              <div>
                <span>服务部门:</span>
                <Select
                  className={styles.ml10}
                  size="small"
                  defaultValue="请选择"
                  dropdownMatchSelectWidth={false}
                  onChange={this.handleSelechChange}
                >
                  <Option value="">请选择</Option>
                  { checkLineDepts.map((data, index) => {
                    return (
                      <Option key={`checkLineName${{ index }}`} value={data.deptId}>{ data.dept }</Option>
                    );
                  }) }
                </Select>
                <Button
                  className={styles.ml10}
                  type="primary"
                  size="small"
                  onClick={this.handleSearch}
                >
                  查询
                </Button>
                <Button
                  className={styles.ml10}
                  type="primary"
                  size="small"
                  id="add"
                  onClick={this.hanleCkLineAdd}
                >
                  新增线路
                </Button>
              </div>
              <br/>
              <DcCheckLineInitTable />
            </Col>
          </Row>
        </Card>
        <DcCheckLineModal
          visible={this.state.addModal}
          onCancel={this.handleModalCancel}
          record={this.state.record}
        />
      </Spin>
    );
  }
}


function mapStateToProps(DcCheckLine) {
  return DcCheckLine;
}

export default connect(mapStateToProps)(DcCheckLine);
