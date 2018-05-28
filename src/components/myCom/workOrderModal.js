/**
 * Created by zhangfuchaun on 2017/8/7.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Util, AntModal, MockData } from '../../utils/CommonUtil';
import { Card, Col, Form, Input,Row,  Table, Select, Radio, Upload, Icon, Button,Modal, TimePicker  } from 'antd';
const FormItem = Form.Item;
import styles from './EPatrol.css';

//工单详情确认弹出框
class workOrderModal extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    const { validateFieldsAndScroll} = this.props.form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const formValue = {...values};
      this.props.dispatch({
        type: 'EPatrol/tasklog',
        payload:formValue,
      });
      this.setState({
        visible: false,
      });
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const{ TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const { executeInfo } = this.props.EPatrol;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18},
    };
    return (
      <div>
        <Button  onClick={this.showModal} className={styles.workOrderBtn1}>工单确认</Button>
        <Modal
          title="工单确认"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form>
           <FormItem
              label=""
              {...formItemLayout}
              className={styles.confirm}
            >
              {getFieldDecorator('confirm', {    //prodName==>定义唯一ID，也是key
                initialValue:"",   //定义初始值
              })(
                <TextArea  rows={4} />
              )}
            </FormItem>
            <FormItem
              label="taskId"
              {...formItemLayout}
              className={styles.styDisplay}
            >
              {getFieldDecorator('taskId', {    //prodName==>定义唯一ID，也是key
                initialValue:executeInfo.taskId,   //定义初始值
              })(
                <Input
                  type="text"
                  disabled={true}
                />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(EPatrol) {
  return EPatrol;
}
const GoodsEntryForm = Form.create()(workOrderModal);

export default connect (mapStateToProps) (GoodsEntryForm);
