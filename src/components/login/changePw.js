/**
 * Created by zhangfuchuan on 2017/8/4.
 *  *  // .--,       .--,
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
import React from 'react';
import { connect } from 'dva';
import { Input, Row, Col  ,Button,Form,Icon } from 'antd';
import styles from './login.css';
const FormItem = Form.Item;
class changePw extends React.Component{
  state = {
    confirmDirty: false,
  };
  // 新密码教验
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassWord')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  };
  // 新密码教验
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  //提交
  subPw = () => {
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const formValue = {...values};
      this.props.form.validateFields(
        (err) => {
          if (!err) {
            this.props.dispatch({
              type:'loginModels/changePw',
              payload:formValue,
            });
          }
        },
      );
    });
  };
  render(){
    const formItemLayout = {
      labelCol: { span:5 },
      wrapperCol: { span: 19},
    };
    const { getFieldDecorator } = this.props.form;
    return(
      <div style={{padding:20}}>
        <Form>
          <FormItem
          label="原始密码:"
          {...formItemLayout}
        >
          {getFieldDecorator('oldPassWord', {
            initialValue:"",
            rules: [{
              required: true,
              message: '请输入原始密码！',
            }],
          })(
            <Input type="password" />,
          )}
        </FormItem>
         <FormItem
          {...formItemLayout}
          label="新密码"
          hasFeedback
        >
          {getFieldDecorator('newPassWord', {
            rules: [{
              required: true, message: '请输入新密码!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认新密码"
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请再次输入新密码!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password"  />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary"  className={styles.changePwBtn} onClick={this.subPw}>
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
function mapStateToProps(loginModels) {
  return loginModels
}
const formChangePw =  Form.create()(changePw);
export default connect (mapStateToProps) (formChangePw);
