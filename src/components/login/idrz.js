/**
 * Created by zhangfuchuan on 2017/8/4.
 * // .--,       .--,
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
import { Checkbox, Row, Col  ,Button } from 'antd';
import styles from './login.css';

class idrzPage extends React.Component {
  onCvChange=(checkedValues)=>{
    this.props.dispatch({
      type:"loginModels/setRoleTypeMeth",
      payload:{newRoleId:checkedValues},
    })
  };

  setRoleType=()=>{
    const allRoleId = "XJY;JXY;MANAGER;LEADER";
    const checkValues = this.props.loginModels.newRoleId;
    const newRoleId = checkValues.join(";");
    this.props.dispatch({
      type:"loginModels/setRoleType",
      payload:{newRoleId,allRoleId}
    });
  };

  render(){
    return(
      <div className={styles.idrzBox}>
        <span className={styles.idrzFont}>我是：</span>
        <Checkbox.Group onChange={this.onCvChange}>
          <Row  style={{marginLeft:50}}>
            <Col className={styles.idrzCol}><Checkbox value="XJY">巡检员</Checkbox></Col>
            <Col className={styles.idrzCol}><Checkbox value="JXY">检修员</Checkbox></Col>
            <Col className={styles.idrzCol}><Checkbox value="ZBC">值班长</Checkbox></Col>
            <Col className={styles.idrzCol}><Checkbox value="MANAGER">主管/领导</Checkbox></Col>
          </Row>
          <Button type="primary" className={styles.idrzBtn} onClick={this.setRoleType}>确定</Button>
        </Checkbox.Group>
      </div>
    );
  }
}


function mapStateToProps(loginModels) {
  return loginModels;     //namespace
}
export default connect(mapStateToProps)(idrzPage);
