/**
 * Created by zhang on 2017/12/17.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Util, AntModal, MockData } from '../../utils/CommonUtil';
import { Card, Col, Form, Input,Row, Select,  Button,Modal, TimePicker  } from 'antd';
import QualityLRTable from './qualityLRTable';
import styles from './EPatrol.css';
const FormItem = Form.Item;
const Option = Select.Option;
var checkItemIdLi;
var zhiTypeListSel = [];  //质检类型
let specType = '';
//新增弹窗
class LocalizedModal extends React.Component {
  state = { visible: false }
  //隐藏Modal
  hideModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'EPatrol/getDcitemMeth',
      payload: {zhijianInfo:{}},
    });
    this.setState({
      visible: false,
    });
  };
  handleOk = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch, EPatrol } = this.props;
   const { yangpinTable,zhijianSpecId,zhijianCollectDttm} = EPatrol;
    yangpinTable.map((el)=>{
      delete el.recId;
    });
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const formValue = {...values};
      formValue.specId = zhijianSpecId;
      formValue.collectDttm= zhijianCollectDttm;
      //提交
      dispatch({
        type: 'EPatrol/luZhijain',
        payload: {
          specId:zhijianSpecId,
          specInfo:formValue,
          logs:yangpinTable
        },
      });
      //清空表单
      dispatch({
        type: 'EPatrol/getDcitemMeth',
        payload: {
          yangpinTable:[],  //清空表格
        },
      });
      //隐藏表单
      this.setState({
        visible: false,
      });
    });
  };
  //点击编辑触发
  getModalInfo = () => {
    let checkItemId = this.props.recId;
    let index = this.props.index;
    //新增时清空值
    if (!checkItemId){
      this.props.form.setFieldsValue({specExecCode:"",qiDesc:"",qiType:""});
    }
    checkItemIdLi =checkItemId;
    if (checkItemId){
      this.props.dispatch({
        type: 'EPatrol/luZhijianTableModel',
        payload: {
          index:index,
        } ,
      });
    }
    this.props.dispatch({
      type: 'EPatrol/getDcitemMeth',
      payload: {
        yangpinTable:[],  //清空表格
      },
    });
    this.thisdispatch(specType);
    this.setState({
      visible: true,
    });
  };
  thisdispatch = (specType) => {
    this.props.dispatch({
      type: 'EPatrol/zhiType',  //质检类型
      payload: {
        id: specType,
      },
    });
  };
  selZhiTab =(qiType)=>{
    this.props.dispatch({
      type: 'EPatrol/getyangpin',  //根据选择的质检类型来查询对应的表格数据
      payload: {
        qiType: qiType, //质检类型
        specType:specType , //样品类型
      },
    });
  };
  // 加载完成后执行数据列表查询
  componentDidMount() {
    const specId = localStorage.getItem('specId');
    const specBatch = localStorage.getItem('specBatch');
    const specName = localStorage.getItem('specName');
    specType = localStorage.getItem('specType');
    //更新带过来的属性至本地state
    this.props.dispatch({
      type: 'EPatrol/refreshDeviceId',
      payload: {
        zhijianSpecId:specId,
        zhijianSpecBatch:specBatch,
        zhijianSpecName:specName,
        zhijianSpecType:specType
      },
    });
  }
  render(){
    const{ TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const { zhiTypeList,zhijianInfo,zhijianSpecName,zhijianSpecBatch } = this.props.EPatrol;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18},
    };
    //样品类型赋值
    if (zhiTypeList && zhiTypeList.itemCode){
      const zhiTypeListOpt = zhiTypeList.itemCode;
      zhiTypeListSel = zhiTypeListOpt.map(obj => <Option key={obj._ID}>{obj._CN}</Option>);
    }else {
      zhiTypeListSel =[];
    }
    return (
      <span>
        <Button type="primary" onClick={this.getModalInfo} className={styles.DeviceMLeft}  data-checkItemId={this.props.recId}>{this.props.title}</Button>
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
                label="质检编码"
                {...formItemLayout}
              >
                {getFieldDecorator('specExecCode', {    //prodName==>定义唯一ID，也是key
                  initialValue: checkItemIdLi? zhijianInfo.specExecCode:"",
                })(
                  <Input
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem
                label="样品名称"
                {...formItemLayout}
              >
                {getFieldDecorator('specName', {    //prodName==>定义唯一ID，也是key
                  initialValue:zhijianSpecName? zhijianSpecName :"",   //定义初始值
                })(
                  <Input
                    type="text"
                    disabled={true}
                  />,
                )}
              </FormItem>
              <FormItem
                label="样品编码"
                {...formItemLayout}
              >
                    {getFieldDecorator('specBatch', {    //prodName==>定义唯一ID，也是key
                      initialValue: zhijianSpecBatch? zhijianSpecBatch :"",   //定义初始值
                    })(
                      <Input
                        type="text"
                        disabled={true}
                      />,
                    )}
              </FormItem>
              <FormItem
                label="质检类型"
                {...formItemLayout}
              >
            {getFieldDecorator('qiType', {
              initialValue: checkItemIdLi? zhijianInfo.qiType:"",
              rules: [{ required: true, message: '请选择!' }],
            })(
              <Select
                showSearch
                onSelect={this.selZhiTab}
                placeholder="请选择质检类型"
              >
                {zhiTypeListSel}
              </Select>,
            )}
          </FormItem>
          {/*单元格*/}
          <QualityLRTable  />
            <br />
            <FormItem
              label="质检情况说明"
              {...formItemLayout}
            >
                {getFieldDecorator('qiDesc', {    //prodName==>定义唯一ID，也是key
                  initialValue:checkItemIdLi? zhijianInfo.qiDesc:"",
                })(
                  <Input
                    type="textarea"
                  />,
                )}
              </FormItem>
            <FormItem
              label="样品类型"
              style={{ display: 'none' }}
              {...formItemLayout}
            >
                {getFieldDecorator('specType', {
                  initialValue: specType ? specType :"",
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
const GoodsEntryForm = Form.create()(LocalizedModal);

export default connect (mapStateToProps) (GoodsEntryForm);

