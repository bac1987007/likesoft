/**
 * Created by zhangfuchuan on 2017/7/17.
 *  // .--,       .--,
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


import React, { Component } from 'react';
import { connect } from 'dva';
import { Util, AntModal, MockData } from '../../utils/CommonUtil';
import { Card, Col, Form, Input,Row,  Table, Select, Radio, Upload, Icon, Button,Modal, TimePicker  } from 'antd';
import CjconTable from './Cjcon';
import styles from './EPatrol.css';
const FormItem = Form.Item;
const Option = Select.Option;
var checkItemIdLi;

var dataSourceTy = "STR";
function handleChangeDataSou(key){
  dataSourceTy = key;
}

//新增弹窗
class LocalizedModal extends React.Component {
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
  handleOk = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch, EPatrol } = this.props;
    const { deviceInfo, orgId, deviceCode, deviceId } = EPatrol;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const formValue = {...values};
      formValue.orgId = orgId;
      formValue.deviceId = deviceId;
      formValue.deviceCode = deviceCode;
      formValue.checkItemId = deviceInfo.checkItemId;
      formValue.collects=EPatrol.deviceInfo.collects;
      //提交
      dispatch({
        type: 'EPatrol/addDcitem',
        payload: formValue,
      });
      //清空表单
      dispatch({
        type: 'EPatrol/getDcitemMeth',
        payload: {deviceInfo:{}},
      });
      //隐藏表单
      this.setState({
        visible: false,
      });
    });
  };
  //点击编辑触发
  getModalInfo = () => {
    let checkItemId = this.props.checkItemId;
    //新增时清空值
    if (!checkItemId){
      this.props.form.setFieldsValue({ckPart:"",checkItem:"",ckMethod:"",judgeStandard:"",hadleMethod:""});
    }
    checkItemIdLi =checkItemId;
    if (checkItemId){
      this.props.dispatch({
        type: 'EPatrol/getCheckItemInfo',
        payload: {
          checkItemId:checkItemId,
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
    const { deviceInfo } = this.props.EPatrol;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18},
    };
    return (
      <span>
        <Button type="primary" onClick={this.getModalInfo} className={styles.DeviceMLeft}  data-checkItemId={this.props.checkItemId}>{this.props.title}</Button>
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
                label="巡检部位"
                {...formItemLayout}
              >
                {getFieldDecorator('ckPart', {    //prodName==>定义唯一ID，也是key
                  initialValue:checkItemIdLi ? deviceInfo.ckPart : "",   //定义初始值
                })(
                  <Input
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem
                label="内容/项目"
                {...formItemLayout}
              >
                {getFieldDecorator('checkItem', {    //prodName==>定义唯一ID，也是key
                  initialValue: checkItemIdLi? deviceInfo.checkItem:"",   //定义初始值
                })(
                  <Input
                    type="text"
                  />,
                )}
              </FormItem>
              {/*<FormItem*/}
                {/*layout="inline"*/}
                {/*label="周期类型"*/}
              {/*>*/}
                {/*{getFieldDecorator('ckPeriod', {    //prodName==>定义唯一ID，也是key*/}
                  {/*initialValue: checkItemIdLi?deviceInfoPop.ckPeriod:"",   //定义初始值*/}
                {/*})(*/}
                  {/*<Select>*/}
                    {/*<Option value="1">每小时/次</Option>*/}
                    {/*<Option value="2">每小时/2次</Option>*/}
                  {/*</Select>,*/}
                {/*)}*/}
              {/*</FormItem>*/}
              {/*<FormItem*/}
                {/*layout="inline"*/}
                {/*label="指定周期"*/}
              {/*>*/}
                {/*{getFieldDecorator('ckTime', {    //ckTime==>定义唯一ID，也是key*/}
                  {/*initialValue:  checkItemIdLi?deviceInfoPop.ckTime:"",   //定义初始值*/}
                {/*})(*/}
                  {/*<Input*/}
                    {/*type="text"*/}
                    {/*style={{ width: '100%' ,display:"inline-block"}}*/}
                  {/*/>,*/}
        {/*//          <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,*/}
                {/*)}*/}
              {/*</FormItem>*/}
              <FormItem
                label="巡检方法"
                {...formItemLayout}
              >
                {getFieldDecorator('ckMethod', {
                  initialValue:  checkItemIdLi?deviceInfo.ckMethod:"",
                })(
                  <TextArea  rows={3}/>    //setFieldsValue
                )}
              </FormItem>
              <FormItem
                label="判断标准"
                {...formItemLayout}
              >
                {getFieldDecorator('judgeStandard', {
                  initialValue: checkItemIdLi? deviceInfo.judgeStandard:"",
                })(
                  <TextArea  rows={3} />
                )}
              </FormItem>
              <FormItem
                label="处理方法"
                {...formItemLayout}
              >
                {getFieldDecorator('hadleMethod', {
                  initialValue:  checkItemIdLi?deviceInfo.hadleMethod:"",
                })(
                  <TextArea  rows={3}  />
                )}
              </FormItem>
            <FormItem
              label="信息录入方式"
              {...formItemLayout}
            >
            {getFieldDecorator('dataSourcetype', {
              initialValue:checkItemIdLi?deviceInfo.dataSourcetype:"",
            })(
              <Select
                onChange={handleChangeDataSou}
              >
                <Option key="STR">数值</Option>
                <Option key="FIX">选择</Option>
                <Option key="ZNCJ">智能采集</Option>
              </Select>,
            )}
            </FormItem>
            {
              dataSourceTy == "FIX" ? (
                <FormItem
                  label="信息内容"
                  {...formItemLayout}
                >
                  {getFieldDecorator('dataSource', {
                    initialValue:checkItemIdLi?deviceInfo.dataSource:"",
                    rules: [{ required: true, message: '请输入!' }],
                  })(
                    <TextArea  rows={3} placeholder='例:[{"_ID":"10","_CN":"正常","OK":"Y"},{"_ID":"20","_CN":"轻微","OK":"Y"},{"_ID":"30","_CN":"严重","OK":"N"}]' />,
                  )}
                </FormItem>
              ) : null
            }
            <FormItem
              label="上限"
              {...formItemLayout}
            >
                {getFieldDecorator('limitU', {
                  initialValue:checkItemIdLi?deviceInfo.limitU:"",
                })(
                  <Input
                    placeholder="建议录入数值"
                    type="text"
                  />,
                )}
            </FormItem>
             <FormItem
               label="上限处理方法"
               {...formItemLayout}
             >
                  {getFieldDecorator('limitUMethod', {
                    initialValue:checkItemIdLi? deviceInfo.limitUMethod:"",
                  })(
                    <TextArea  rows={3}  />,
                  )}
              </FormItem>
             <FormItem
               label="下限"
               {...formItemLayout}
             >
                  {getFieldDecorator('limitL', {
                    initialValue:checkItemIdLi? deviceInfo.limitL:"",
                  })(
                    <Input
                      placeholder="建议录入数值"
                      type="text"
                    />,
                  )}
              </FormItem>
             <FormItem
               label="下限处理方法"
               {...formItemLayout}
             >
                {getFieldDecorator('limitLMethod', {
                  initialValue:checkItemIdLi? deviceInfo.limitLMethod:"",
                })(
                  <TextArea  rows={3}  />,
                )}
              </FormItem>
          </Form>
          {/*采集信息单元格*/}
           {/*<CjconTable  />*/}
        </Modal>
      </span>
    );
  }
}

function mapStateToProps(EPatrol) {
  return EPatrol;
}
const GoodsEntryForm = Form.create()(LocalizedModal);

export default connect (mapStateToProps) (GoodsEntryForm);

