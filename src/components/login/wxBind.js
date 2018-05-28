/**
 * Created by lizhipeng on 2018/1/4.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Button, Form, Icon } from 'antd';
import styles from './wxBind.css';

const FormItem = Form.Item;

class WxBind extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.bindWx(values);
      }
    });
  };

  bindWx = (values) => {
    this.props.dispatch({
      type: 'wxBindModels/bindWx',
      payload: { ...values },
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row span={24} type="flex" justify="center" align="middle" className={styles['full-height']}>
        <Col>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入账户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />,
              )}
            </FormItem>
            <FormItem className={styles.lkTextCenter}>
              <Button type="primary" htmlType="submit">
                绑定帐号
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WxBindForm = Form.create()(WxBind);
function mapStateToProps(wxBindModels) {
  return wxBindModels;
}
export default connect(mapStateToProps)(WxBindForm);

