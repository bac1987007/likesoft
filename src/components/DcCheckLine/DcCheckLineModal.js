/**
 * Created by lizhipeng on 2017/7/20.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Table, Modal, Form, Row, Col, Input, Select, Radio, TimePicker, Button, Icon, Popconfirm,Tooltip,InputNumber  } from 'antd';
import moment from 'moment';
import ItemModal from './DcCheckItemModal';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
var dataSources;
var ckLineItem;
//新增時巡檢項目清空
var AddEdiet=0;
class DcCheckLineModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemView: false,
    };
  }

  // 巡检项目新增
  handleItemAdd = () => {
    this.setState({
      itemView: true,
    });
  };
  // 巡检项目删除
  hanleItemDelete = (param, index) => {
    const { ckLineItems, ckLineItemIds } = this.props.DcCheckLine;
    const itemId = param.checkItemId;
    ckLineItems.splice(index, 1);
    ckLineItemIds.splice(ckLineItemIds.indexOf(itemId), 1);
    this.props.dispatch({
      type: 'DcCheckLine/update',
      payload: { ckLineItems, ckLineItemIds },
    });
  };
  // 保存,根据checkLineId是否为null判断新增或编辑
  handleLineSave = (record) => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch, DcCheckLine } = this.props;
    const { ckLineItems } = DcCheckLine;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const data = { ...values };
      data.checkLineId = record.checkLineId;
      data.orgId = record.orgId;

      // 巡检项目列表
      data.cklineItems = ckLineItems;
      dispatch({
        type: 'DcCheckLine/saveCheckLine',
        payload: { ...data },

      });
      //保存完后，清空組件
      this.props.form.resetFields();
      AddEdiet =1;
    });
    //shangxin 关闭model
    this.props.onCancel();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { DcCheckLine, visible, onCancel, record } = this.props;

    const { checkLineDepts, checkLineRoles, checkLinePeriodKeys,
      checkLinePeriod, checkLineHitSet, ckLineItems, dcLineModalShowLoading } = DcCheckLine;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const columns = [{
      title: '序号',
      dataIndex: 'checkNo',
      width: '10%',
    },{
      title: '巡检项目',
      dataIndex: 'checkItem',
      width: '80%',
    }, {
      title: <Button type="primary" size="small" onClick={this.handleItemAdd}>新增</Button>,
      dataIndex: 'operation',
      render: (text, param, index) => {
        return (
          <Popconfirm title="确认删除?" onConfirm={() => this.hanleItemDelete(param, index)} okText="确认" cancelText="取消">
            <Button
              style={{ color: '#d73435' }}
              size="small"
            >
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        );
      },
    }];
     dataSources = [];
    ckLineItem =ckLineItems;
    if (ckLineItem) {
      ckLineItem.map((item, i) => {
        item.checkNo =i+1;
        const result = item;
        result.key = i;
        return dataSources.push(result);
      });
    }
    if(AddEdiet==1){
      dataSources = [];
      ckLineItem=null;
      AddEdiet=0;
    }
    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        maskClosable={false}
        onOk={() => { this.handleLineSave(record); }}
        okText="保存" cancelText="取消"
      >
        <Spin
          spinning={dcLineModalShowLoading}
          tip="加载中..."
        >
          <Form>
            <Row>
              <Col span={22} offset={1}>
                <FormItem
                  label="线路名称"
                  {...formItemLayout}
                >
                  {getFieldDecorator('checkLineName', {
                    initialValue: record.checkLineName || '',
                  })(
                    <Input
                      type="text"
                      style={{ width: '60%' }}
                    />,
                  )}
                </FormItem>
                <FormItem
                  label="部门"
                  {...formItemLayout}
                >
                  {getFieldDecorator('deptId', {
                    initialValue: record.deptId || '',
                  })(
                    <Select>
                      <Option value="" >请选择</Option>
                      {checkLineDepts.map((data, index) => {
                        return (
                          <Option key={`deptKey${{ index }}`} value={data.deptId}>{data.dept}</Option>
                        );
                      })}
                    </Select>,
                  )}
                </FormItem>
                <FormItem
                  label="岗位"
                  {...formItemLayout}
                >
                  {getFieldDecorator('ckRole', {
                    initialValue: record.ckRole || '',
                  })(
                    <Select>
                      <Option value="" >请选择</Option>
                      {checkLineRoles.map((role, index) => {
                        return (
                          <Option key={`roleKey${{ index }}`} value={role.roleId} >{role.roleName}</Option>
                        );
                      })}
                    </Select>,
                  )}
                </FormItem>
                <FormItem
                  label="周期类型"
                  {...formItemLayout}
                >
                  {getFieldDecorator('ckPeriod', {
                    initialValue: record.ckPeriod || '',
                  })(
                    <RadioGroup size="small" defaultChecked="N">
                      {
                        checkLinePeriodKeys.map((key, i) => {
                          return (<RadioButton key={`periodKey${i}`} value={key}>{checkLinePeriod[key]}</RadioButton>);
                        })
                      }
                    </RadioGroup>,
                  )}
                </FormItem>
                <Tooltip placement="topRight" title={<div>
                  <h4>周期时间格式：</h4>
                  <p> 每天：hh:mm 当为多个时以;分割</p>
                  <p>每周：SAT;hh:mm 当有多个时以&分割</p>
                  <p>每月：dd;hh:mm 当有多个时以&分割</p>
                  <p>只执行一次：yyyy-MM-dd hh:mm</p>
                  附：星期一 MON 星期二 TUE 星期三 WED 星期四 THU 星期五 FRI 星期六 SAT 星期天 SUN
                </div>} style={{}}>
                  <Icon type="question-circle" style={{ fontSize: 16, color: '#08c',zIndex:"9" ,top:"16.5rem",left:"26rem",position:"absolute"}} />
                </Tooltip>
                <FormItem
                  label="执行时间"
                  {...formItemLayout}
                >
                  {getFieldDecorator('ckTime', {
                    initialValue: record.ckTime || '',
                  })(
                    <Input
                      type="text"
                      style={{ width: '100%', display: 'inline-block' }}
                    />,
                  )}
                </FormItem>
                <Tooltip placement="topRight" title={<div>
                  <p>执行时效格式:（分钟为单位）</p>
                  <p>例:90(等同于一个半小时)</p>
                </div>} style={{}}>
                  <Icon type="question-circle" style={{ fontSize: 16, color: '#08c',zIndex:"9" ,top:"20rem",left:"26rem",position:"absolute"}} />
                </Tooltip>
                <FormItem
                  label="执行时效"
                  {...formItemLayout}
                >
                  {getFieldDecorator('ckTimeClick', {
                    initialValue: record.ckTimeClick || '',
                  })(
                    <InputNumber placeholder="单位:分钟(仅限输入数字)" min={1} max={1000000} style={{ width: '100%', display: 'inline-block' }} />,
                  )}
                </FormItem>
                <FormItem
                  label="任务提醒设置"
                  {...formItemLayout}
                >
                  {getFieldDecorator('hitSet', {
                    initialValue: record.hitSet || '',
                  })(
                    <Select>
                      <Option value="" >请选择</Option>
                      {checkLineHitSet.map((data, index) => {
                        return (<Option key={`hitSet${{ index }}`} value={data}>{data}</Option>);
                      })}
                    </Select>,
                  )}
                </FormItem>
                <Table bordered size="small" dataSource={dataSources} columns={columns} />
              </Col>
            </Row>
          </Form>
        </Spin>
        {/* dcItemModal*/}
        <ItemModal
          visible={this.state.itemView}
          parentModal={this}
        />
      </Modal>
    );
  }
}

function mapStateToProps(DcCheckLine) {
  return DcCheckLine;
}

const DcCheckLineModalForm = Form.create()(DcCheckLineModal);

export default connect(mapStateToProps)(DcCheckLineModalForm);
