/**
 * Created by zhangfuchuan on 2017/7/25.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, Form, Icon, Checkbox } from 'antd';
import styles from './login.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.loginPost(values);
      }
    });
  };
  loginPost = (values) => {
    this.props.dispatch({
      type: 'loginModels/login',
      payload: { ...values },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.login}>
        <div className={styles.loginHeader}><h2>您好!欢迎登录...</h2></div>
        <div className={styles.loginKong} />
        <Form onSubmit={this.handleSubmit} className={styles.loginMain}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账户" />,
          )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />,
          )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>,
          )}
            <a className={styles.loginForgot} href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>
            登录
          </Button>
          还没账号？<a href="">注册</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
function mapStateToProps(login) {
  return login;
}
export default connect(mapStateToProps)(WrappedNormalLoginForm);
