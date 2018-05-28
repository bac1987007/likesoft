/**
 * Created by zhang on 2017/12/17.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Util, AntModal, MockData } from '../../utils/CommonUtil';
import { Card, Col, Form, Input,Row,  Table, Select, Radio, DatePicker , Button,Modal, TimePicker  } from 'antd';
import styles from './EPatrol.css';
const FormItem = Form.Item;
const Option = Select.Option;
var checkItemIdLi;  //主键id（修改时用）
var ypTypeListSel = [];  //样品类型
var zhiTypeListSel = [];  //质检类型
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
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
      payload: {jieyangInfo:{}},
    });
    this.setState({
      visible: false,
    });
  };
  //确定Modal
  handleOk = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch, EPatrol } = this.props;
    const { jieyangInfo,TimeChangeS0} = EPatrol;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const formValue = {...values};
      formValue.specId = jieyangInfo.specId;
      formValue.collectDttm = TimeChangeS0;
      //提交
      dispatch({
        type: 'EPatrol/jieyangAdd',
        payload: formValue,
      });
      //清空表单
      dispatch({
        type: 'EPatrol/getDcitemMeth',
        payload: {jieyangInfo:{}},
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
      this.props.form.setFieldsValue({specType:"",qiType:"",specBatch:"",specName:"",specCnt:"",collectDttm :"",qiUser:"",auditDesc :""});
    }
    checkItemIdLi =checkItemId;
    if (checkItemId){
      this.props.dispatch({
        type: 'EPatrol/queryZjListModel',
        payload: {
          // index:index,
          specId:checkItemId
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
      },
    });
  };
  TimeChangeS0=(value,string)=>{
    this.props.dispatch({
      type: 'EPatrol/addDcitemMeth',
      payload: {
        TimeChangeS0: string,
      },
    });
  };
  render(){
    const{ TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const { jieyangInfo,ypTypeList,zhiTypeList  } = this.props.EPatrol;
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
              initialValue: checkItemIdLi? jieyangInfo.specType:"",
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
              initialValue:  checkItemIdLi? jieyangInfo.qiType:"",
              rules: [{ required: true, message: '请选择!' }],
            })(
              <Select
                showSearch
                placeholder="请选择质检类型"
              >
                {zhiTypeListSel}
              </Select>,
            )}
          </FormItem>
             <FormItem label="样品批号"  {...formItemLayout}>
            {getFieldDecorator('specBatch', {
              initialValue:checkItemIdLi? jieyangInfo.specBatch:"",
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input  type="text" />,
            )}
          </FormItem>
          <FormItem label="样品名称" {...formItemLayout}>
            {getFieldDecorator('specName', {
              initialValue: checkItemIdLi? jieyangInfo.specName:"",
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input  type="text" />,
            )}
          </FormItem>
          <FormItem label="样品数量" {...formItemLayout}>
            {getFieldDecorator('specCnt', {
              initialValue: checkItemIdLi? jieyangInfo.specCnt:"",
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input  type="text" />,
            )}
          </FormItem>
          <FormItem
            label="采集时间"
            {...formItemLayout}
          >
            {getFieldDecorator('collect', {
              initialValue:checkItemIdLi? jieyangInfo.collectDttm:"",
            })(
              <DatePicker
                onChange={this.TimeChangeS0}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            )}
          </FormItem>
          <FormItem label="质检人员" {...formItemLayout}>
            {getFieldDecorator('qiUser', {
              initialValue: checkItemIdLi? jieyangInfo.qiUser:"",
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input  type="text" />,
            )}
          </FormItem>
          <FormItem label="质检备注" {...formItemLayout}>
            {getFieldDecorator('auditDesc', {
              initialValue:checkItemIdLi? jieyangInfo.auditDesc:"",
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input type="textarea" />,
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

