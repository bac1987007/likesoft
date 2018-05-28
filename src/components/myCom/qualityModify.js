/**
 * Created by zhang on 2017/12/17.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Util, AntModal, MockData } from '../../utils/CommonUtil';
import { Card, Col, Form, Input,Row,  Table, Select, Radio, Upload, Icon, Button,Modal, TimePicker  } from 'antd';
import styles from './EPatrol.css';
const FormItem = Form.Item;
const Option = Select.Option;
var checkItemIdLi;
var dataSourceTy = "STR";
function handleChangeDataSou(key){
  dataSourceTy = key;
}

//新增弹窗
class zhijianModel extends React.Component {
  state = { visible: false }
  //隐藏Modal
  hideModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'EPatrol/getDcitemMeth',
      payload: {deviceInfo:{}},
    });
    this.setState({
      visible: false,
    });
  };
  //修改确认
  handleOk = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch, EPatrol } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const formValue = {...values};
      formValue.specId =  this.props.checkItemId;
      formValue.recId =  this.props.recId;
      console.log( this.props.recId);
      dispatch({
        type: 'EPatrol/luZhijainPut',
        payload: formValue,
      });
      //清空表单
      dispatch({
        type: 'EPatrol/getDcitemMeth',
        payload: {zhiPutInfo:{}},
      });
      //隐藏表单
      this.setState({
        visible: false,
      });
    });
  };
  //点击编辑触发
  getModalInfo = () => {
    let checkItemId = this.props.checkItemId;  //specId
    let index = this.props.index;
    //新增时清空值
    if (!checkItemId){
      this.props.form.setFieldsValue({qiItemName:"",qiVal:"",qiOffset:"",qiDesc:""});
    }
    checkItemIdLi =checkItemId;
    if (checkItemId){
      this.props.dispatch({
        type: 'EPatrol/luZhijianTableModel',
        payload: {
          specId:checkItemId,
          index:index,
        } ,
      });
    }
    this.setState({
      visible: true,
    });
  };
  render(){
    const{ TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const { zhiPutInfo } = this.props.EPatrol;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18},
    };
    return (
      <span>
        <Button type="primary" onClick={this.getModalInfo} className={styles.DeviceMLeft} data-recId={this.props.recId}  data-checkItemId={this.props.checkItemId}>{this.props.title}</Button>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          width="500px"
        >
          <Form>
              <FormItem
                label="质检项目"
                {...formItemLayout}
              >
                {getFieldDecorator('qiItemName', {    //prodName==>定义唯一ID，也是key
                  initialValue:checkItemIdLi ? zhiPutInfo.qiItemName : "",   //定义初始值
                })(
                  <Input
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem
                label="质检结果"
                {...formItemLayout}
              >
                {getFieldDecorator('qiVal', {    //prodName==>定义唯一ID，也是key
                  initialValue: checkItemIdLi? zhiPutInfo.qiVal:"",   //定义初始值
                })(
                  <Input
                    type="text"
                  />,
                )}
              </FormItem>
            <FormItem
              label="偏离信息"
              {...formItemLayout}
            >
                {getFieldDecorator('qiOffset', {    //prodName==>定义唯一ID，也是key
                  initialValue: checkItemIdLi? zhiPutInfo.qiOffset:"",   //定义初始值
                })(
                  <Select
                    showSearch
                    // defaultValue="normal"
                    placeholder="请选择"
                  >
                    <Option value="偏高">偏高</Option>
                    <Option value="正常">正常</Option>
                    <Option value="偏低">偏低</Option>
                  </Select>
                )}
              </FormItem>
            <FormItem
              label="备注"
              {...formItemLayout}
            >
                {getFieldDecorator('qiDesc', {    //prodName==>定义唯一ID，也是key
                  initialValue: checkItemIdLi? zhiPutInfo.qiDesc:"",   //定义初始值
                })(
                  <Input
                    type="text"
                  />,
                )}
              </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}



function mapStateToProps(EPatrol) {
  return EPatrol;
}
const GoodsEntryForm = Form.create()(zhijianModel);

export default connect (mapStateToProps) (GoodsEntryForm);

