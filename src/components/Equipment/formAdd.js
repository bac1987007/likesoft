/**
 * Created by lawliet on 2017/7/18.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Modal, Icon, Button, Select, Form, DatePicker, Tooltip, Row, Col, } from 'antd';
import Moment from 'moment';
import HotTags from './hotTag';
import styles from './deviceManagement.less';

const FormItem = Form.Item;
const Option = Select.Option;
let editDeviceCode;
let idCard;
let searchPeopleOne;
const CollectionCreateForm = Form.create()(
  (props) => {
    // console.log(props);
    const { visible, onCancel, onCreate, form, dept, thisdispatch, searchPeople, patrolPost, parent } = props;
    const { getFieldDecorator } = form;
    const MonthPicker = DatePicker.MonthPicker;
    const RangePicker = DatePicker.RangePicker;
    // 判断编辑还是新增，进行初始化
    // 给部门赋值



    const propDepartment = dept;
    console.log(propDepartment);
    const department = propDepartment.map(obj => <Option key={obj.deptId}>{obj.dept}</Option>);
    let searchPeopleList;
   const patrolPostList = patrolPost.map(obj => <Option key={obj.roleId}>{obj.roleName}</Option>);
    function handleChangeDept(key) {
      form.setFields({ dcManager: { value: '请选择'}});
      thisdispatch(key);
    }
    if (searchPeople!=null ||searchPeople!=undefined) {
      searchPeopleList = searchPeople.map(obj => <Option key={obj.personId}>{obj.personName}</Option>);
    }else{
      searchPeopleList= [];
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <Modal
        visible={visible}
        title="添加"
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="horizontal" >
          <FormItem label="隐藏域，传标识" style={{ display: 'none' }} >
            {getFieldDecorator('deviceId', {
              initialValue: idCard || '',
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem label="隐藏域，传标识" style={{ display: 'none' }}>
            {getFieldDecorator('orgId', {
              initialValue: 'NJBH',
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem label="设备编码"  {...formItemLayout}>
            {getFieldDecorator('deviceCode', {
              initialValue: idCard ? editDeviceCode.deviceCode : '',
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem label="名称及规格" {...formItemLayout}>
            {getFieldDecorator('nameModel', {
              initialValue: idCard ? editDeviceCode.nameModel : '',
              rules: [{ required: true, message: '请输入!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('dcType', {})(
              <HotTags />,
            )}
          </FormItem>
          <FormItem label="安装位置" style={{display:"none"}}>
            {getFieldDecorator('position', {
              initialValue: idCard ? editDeviceCode.position : '',
              rules: [{  message: '请输入!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="设备管理部门"
            {...formItemLayout}
          >
            {getFieldDecorator('deptId', {
              initialValue: idCard ? editDeviceCode.deptId : '',
              rules: [{ required: true, message: '请选择!' }],
            })(
              <Select
                showSearch
                onSelect={handleChangeDept}
                placeholder="请选择管理部门"
              >
                {department}
              </Select>,
            )}
          </FormItem>
          <FormItem
            label="指定管理员"
            {...formItemLayout}
          >
            {getFieldDecorator('dcManager', {
              initialValue: idCard ? editDeviceCode.dcManager : '',
            })(
              <Select
                showSearch
                notFoundContent="请选择"
                placeholder="请选择管理员"
              >
                {searchPeopleList}
              </Select>,
            )}
          </FormItem>
          <FormItem
            label="使用时间"
            {...formItemLayout}
          >
            {getFieldDecorator('installDttm', {
              initialValue: idCard ? Moment(editDeviceCode.installDttm) : '',
            })(
              <DatePicker />,
            )}
          </FormItem>
          <FormItem label="设备供应商" style={{display:"none"}}>
            {getFieldDecorator('provide', {
              initialValue: idCard ? editDeviceCode.provide : '',
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem label="联系方式" style={{display:"none"}}>
            {getFieldDecorator('provideTele', {
              initialValue: idCard ? editDeviceCode.provideTele : '',
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem label="设备技术参数" style={{display:"none"}}>
            {getFieldDecorator('paramInfo', {
              initialValue: idCard ? editDeviceCode.paramInfo : '',
            })(
              <Input type="textarea" />,
            )}
          </FormItem>
          <FormItem
            layout="inline"
            label="周期类型"
            {...formItemLayout}
          >
            {getFieldDecorator('ckPeriod', {    // prodName==>定义唯一ID，也是key
              initialValue: idCard ? editDeviceCode.ckPeriod : '',  // 定义初始值
            })(
              <Select>
                <Option value="D">每天</Option>
                <Option value="O">只执行1次</Option>
                <Option value="M">每月</Option>
                <Option value="Y">每年</Option>

              </Select>,
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
              <Icon type="question-circle" style={{ fontSize: 16, color: '#08c',zIndex:"9" ,top:"31rem",left:"27rem",position:"absolute"}} />
            </Tooltip>

          <FormItem
            layout="inline"
            label="指定周期"
            {...formItemLayout}
          >
            {getFieldDecorator('ckTime', {    // ckTime==>定义唯一ID，也是key
              initialValue: idCard ? editDeviceCode.ckTime : '',   // 定义初始值
            })(

              <Input
                type="text"
                style={{ width: '100%', display: 'inline-block' }}
              />,

            )}
          </FormItem>
          <FormItem
            label="巡检岗位"
            {...formItemLayout}
          >
            {getFieldDecorator('roleId', {
              initialValue: idCard ? editDeviceCode.roleId : '',
            })(
              <Select
                showSearch
                placeholder="请选择巡检岗位"
              >
                {patrolPostList}
              </Select>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  },
);

class FormPage extends React.Component {
  state = {
    visible: false,
    idCard: '',
    dept: [],  // 部门
    searchPeople: [],
    patrolPost: [], // 巡检工
  };
  showModal = () => {
    // 直接判断title
    idCard = this.props.idCard;
    if (idCard) {
      this.props.dispatch({
        type: 'deviceManagement/formEditInfo',
        payload: {
          id: this.props.idCard,
          self: this,
        },
      });
      this.setState({
        visible: true,
        idCard,
      });
    } else {
      this.setState({
        visible: true,
        idCard: null,
      });
    }
  // model出现的时候把部门dept数据加载传给form组件
    const dept = this.props.deviceManagement.dept;
    const patrolPost = this.props.deviceManagement.patrolPost;
   // console.log(dept);
    this.setState({ dept, patrolPost });
    // 更新model
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreateForm = () => {
    const form = this.form;

    form.validateFieldsAndScroll((err, values) => {
      const selectDcType = this.props.deviceManagement.dcType;//获取选中的类别，发送给后台
      values.dcType =selectDcType;
     // console.log(values);
      if (err) {
        return;
      }
      // 提交
      this.props.dispatch({
        type: 'deviceManagement/creatForm',
        payload: { ...values },
      });
     //  console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }
  // 把表单里的select事件写到这里，再prop出去；
  thisdispatch = (key) => { // 先清空
    this.props.dispatch({
      type: 'deviceManagement/searchPeople',
      payload: {
        id: key,
        self: this,
      },
    });
  }
  render() {
    // 定义全局变量接受初始值
    const { editDevice, searchPeople } = this.props.deviceManagement;
    editDeviceCode = editDevice;
    searchPeopleOne = searchPeople;
    // 部门选好后 给后台发送ajax  获取指定管理员
    return (
      <div className={styles.FormPage}>
        <Button type="primary" onClick={this.showModal}>{this.props.title} </Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreateForm}
          dept={this.state.dept}  // 接受model的数据并传给form组件
          thisdispatch={this.thisdispatch}
          searchPeople={this.state.searchPeople}
          patrolPost={this.state.patrolPost}
          parent={this}
        />
      </div>
    );
  }
}
// 与model层建立数据联系
function mapStateToProps(deviceManagement) {
  return deviceManagement;
}

// const deviceManagementForm = Form.create()(deviceManagement);

export default connect(mapStateToProps)(FormPage);
