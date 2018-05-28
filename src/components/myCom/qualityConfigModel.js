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
var checkItemIdLi;  //主键id（修改时用）
var dataSourceTy = "STR";
var ypTypeListSel = [];  //样品类型
var zhiTypeListSel = [];  //质检类型
function handleChangeDataSou(key){
  dataSourceTy = key;
}
//新增弹窗
class yangpinModel extends React.Component {
  state = { visible: false };
  //隐藏Modal
  hideModal = () => {
    const { dispatch  } = this.props;
    dispatch({
      type: 'EPatrol/getDcitemMeth',
      payload: {yangpinInfo:{}},
    });
    this.setState({
      visible: false,
    });
  };
  //确定Modal yangpinInfo
  handleOk = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch, EPatrol } = this.props;
    const { yangpinInfo} = EPatrol;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const formValue = {...values};
      formValue.recId = yangpinInfo.recId;
      //提交
      dispatch({
        type: 'EPatrol/qiConfigAdd',
        payload: formValue,
      });
      //清空表单
      dispatch({
        type: 'EPatrol/getDcitemMeth',
        payload: {yangpinInfo:{}},
      });
      //隐藏表单
      this.setState({
        visible: false,
      });
    });
  };
  //点击编辑时触发
  getModalInfo = () => {
    let checkItemId = this.props.checkItemId;
    let index = this.props.index;
    //新增时清空值
    if (!checkItemId){
      this.props.form.setFieldsValue({specType:"",qiType:"",qiItemCode:"",qiItemName:"",qiStandard:"",qiMethod:"",valType:"",dataSource:"",valUnit:"",rangeMax:"",rangeMin:"",normalMax:"",normalMix:""});
    }
    checkItemIdLi =checkItemId;
    if (checkItemId){
      this.props.dispatch({
        type: 'EPatrol/getyangpinModel',
        payload: {
          recId:checkItemId,
          // index:index,
        } ,
      });
    }
    this.setState({
      visible: true,
    });
  };
  // 把表单里的select事件写到这里，再prop出去；
  thisdispatch = (key) => { // 先清空
    this.props.dispatch({
      type: 'EPatrol/zhiType',  //质检类型
      payload: {
        id: key,
        // self: this,
      },
    });
  };
  render(){
    const{ TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const { yangpinInfo,ypTypeList,zhiTypeList  } = this.props.EPatrol;
    if (ypTypeList[0] && ypTypeList[0].itemCode){
      const ypTypeListOpt = ypTypeList[0].itemCode;
      ypTypeListSel = ypTypeListOpt.map(obj => <Option key={obj._ID}>{obj._CN}</Option>);
    }else {
      ypTypeListSel = [];
    }
    if (zhiTypeList && zhiTypeList.itemCode){
      const zhiTypeListOpt = zhiTypeList.itemCode;
      zhiTypeListSel = zhiTypeListOpt.map(obj => <Option key={obj._ID}>{obj._CN}</Option>);
    }else {
      zhiTypeListSel =[];
    }
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
              label="样品类型"
              {...formItemLayout}
            >
            {getFieldDecorator('specType', {
              initialValue: checkItemIdLi? yangpinInfo.specType:"",
              rules: [{ required: true, message: '请选择!' }],
            })(
              <Select
                showSearch
                onSelect={this.thisdispatch}
                placeholder="请选择样品类型"
              >
                {ypTypeListSel}
              </Select>,
            )}
          </FormItem>
            <FormItem
              label="质检类型"
              {...formItemLayout}
            >
            {getFieldDecorator('qiType', {
              initialValue:  checkItemIdLi? yangpinInfo.qiType:"1",
              rules: [{ required: true, message: '请选择!' }],
            })(
              <Select
                showSearch
                placeholder="请选择质检类型"
              >
                <option value="1">默认</option>
                {zhiTypeListSel}
              </Select>,
            )}
          </FormItem>
              <FormItem
                label="质检项目代码"
                {...formItemLayout}
              >
                {getFieldDecorator('qiItemCode', {    //prodName==>定义唯一ID，也是key
                  initialValue: checkItemIdLi? yangpinInfo.qiItemCode:"",   //定义初始值
                })(
                  <Input
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem
                label="质检项目名称"
                {...formItemLayout}
              >
                {getFieldDecorator('qiItemName', {    //prodName==>定义唯一ID，也是key
                  initialValue: checkItemIdLi? yangpinInfo.qiItemName:"",
                })(
                  <Input
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem
                label="质检适用标准"
                {...formItemLayout}
              >
                  {getFieldDecorator('qiStandard', {
                    initialValue:  checkItemIdLi? yangpinInfo.qiStandard:"",
                  })(
                    <Input
                      type="text"
                    />,
                  )}
              </FormItem>
              <FormItem
                label="质检方法"
                {...formItemLayout}
              >
                {getFieldDecorator('qiMethod', {
                  initialValue: checkItemIdLi? yangpinInfo.qiMethod:"",
                })(
                  <Input
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem
                label="结果"
                {...formItemLayout}
              >
              {getFieldDecorator('valType', {
                initialValue: checkItemIdLi? yangpinInfo.valType:"",
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
                    initialValue: checkItemIdLi? yangpinInfo.dataSource:"",
                    rules: [{ required: true, message: '请输入!' }],
                  })(
                    <TextArea  rows={3} placeholder='例:[{"_ID":"10","_CN":"正常","OK":"Y"},{"_ID":"20","_CN":"轻微","OK":"Y"},{"_ID":"30","_CN":"严重","OK":"N"}]' />,
                  )}
                </FormItem>
              ) : null
            }
            <FormItem
              label="结果显示单位"
              {...formItemLayout}
            >
                {getFieldDecorator('valUnit', {
                  initialValue: checkItemIdLi? yangpinInfo.valUnit:"",
                })(
                  <Select
                    showSearch
                    // defaultValue="normal"
                    placeholder="请选择"
                  >
                    <Option value="%">%</Option>
                    <Option value="Mpa">Mpa</Option>
                  </Select>
                )}
            </FormItem>
             <FormItem
               label="量程最大值"
               {...formItemLayout}
             >
                  {getFieldDecorator('rangeMax', {
                    initialValue: checkItemIdLi? yangpinInfo.rangeMax:"",
                  })(
                    <Input
                      placeholder="建议录入数值"
                      type="text"
                    />,
                  )}
              </FormItem>
            <FormItem
              label="量程最小值"
              {...formItemLayout}
            >
                  {getFieldDecorator('rangeMin', {
                    initialValue: checkItemIdLi? yangpinInfo.rangeMin:"",
                  })(
                    <Input
                      placeholder="建议录入数值"
                      type="text"
                    />,
                  )}
              </FormItem>
            <FormItem
              label="正常值-大值"
              {...formItemLayout}
            >
                  {getFieldDecorator('normalMax', {
                    initialValue: checkItemIdLi? yangpinInfo.normalMax:"",
                  })(
                    <Input
                      placeholder="建议录入数值"
                      type="text"
                    />,
                  )}
              </FormItem>
            <FormItem
              label="正常值-小值"
              {...formItemLayout}
            >
                  {getFieldDecorator('normalMix', {
                    initialValue: checkItemIdLi? yangpinInfo.normalMix:"",
                  })(
                    <Input
                      placeholder="建议录入数值"
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
const GoodsEntryForm = Form.create()(yangpinModel);

export default connect (mapStateToProps) (GoodsEntryForm);

