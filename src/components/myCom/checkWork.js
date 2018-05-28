/**
 * Created by zhangfuchuan on 2017/8/2.
// .--,       .--,
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
import { Table, Input ,Button } from 'antd';
import styles from './EPatrol.css';

class checkWorkPage extends React.Component{
  constructor(props){
    super(props);
    this.columns = [{
      title: '上班时间',
      dataIndex: 'signDttm',
      key: 'signDttm',
      width: '30%',
    }, {
      title: '下班时间',
      dataIndex: 'signoutDttm',
      key: 'signoutDttm',
      width: '30%',
    },{
        title: '工作时间',
        dataIndex: 'workTime',
        key: 'workTime',
        width: '30%',
      }];
  }
  //获取信息内容
  componentDidMount(){
    this.getCheckWork();
    this.getCheckWorkLength();
  }
  //获取考勤列表信息
  getCheckWork =()=>{
    var myDateSn = new Date();
    let nowYear = myDateSn.getFullYear();
    let nowMonth = myDateSn.getMonth()+1;
    this.props.dispatch({
      type:'EPatrol/getCheckWorkInfo',
      payload:{nowYear,nowMonth},
    });
    this.props.dispatch({
      type:'EPatrol/getCheckWorkLength',
      payload:{nowYear,nowMonth},
    });
    document.getElementById("preMouth").style.color = "#999";
    document.getElementById("preMouth").style.border = "1px solid #999";
    document.getElementById("theMouth").style.color = "#f58345";
    document.getElementById("theMouth").style.border = "1px solid #f58345";
  };

  //获取出勤次数与未出勤次数
  getCheckWorkLength=()=>{
    var myDateSn = new Date();
    let nowYear = myDateSn.getFullYear();
    let nowMonth = myDateSn.getMonth()+1;
    this.props.dispatch({
      type:'EPatrol/getCheckWorkLength',
      payload:{nowYear,nowMonth},
    });
  };
  //获取上个月的考勤信息
  previousMou = () => {
    document.getElementById("preMouth").style.border ="1px solid #f58345";
    document.getElementById("preMouth").style.color = "#f58345";
    document.getElementById("theMouth").style.color = " #999";
    document.getElementById("theMouth").style.border = "1px solid #999";
    var myDateSn = new Date();
    let nowYear = myDateSn.getFullYear();
    let nowMonth = myDateSn.getMonth();
    if (nowMonth == 0){
      nowYear = nowYear-1;
      nowMonth = 12;
    }
    this.props.dispatch({
      type:'EPatrol/getCheckWorkInfo',
      payload:{nowYear,nowMonth},
    });
    this.props.dispatch({
      type:'EPatrol/getCheckWorkLength',
      payload:{nowYear,nowMonth},
    });
  };
  render(){
    const columns = this.columns;
    const {checkWorkData} =  this.props.EPatrol;
    const dataSource = [];
    if (checkWorkData){
      checkWorkData.map((data,index)=>{
        const result = data;
        result.key = index;
        return dataSource.push(result);
      });
    }
    return(
      <div className={styles.myCheckWorkMain} >
        <div>
          <span className={styles.checkWorkFont}>选择考勤信息时间：</span>
          <Button id="theMouth" onClick={this.getCheckWork} className={styles.mycheckWOrkButton}>当前月</Button>
          <Button id="preMouth" onClick={this.previousMou} className={styles.mycheckWOrkButton}>上一月</Button>
        </div>
        <br/>
       <div>
         <span className={styles.checkWorkFont}>本月出勤的次数:</span>
         <Input value={this.props.EPatrol.signCount} className={styles.LeftmyCheckInput} disabled={true} />
       </div>
        <br />
        {
          this.props.EPatrol.unUualifiedTimes != -1 ?
            ( <div>
              <span className={styles.checkWorkFont}>未及时巡检次数:</span>
              <Input value={this.props.EPatrol.unUualifiedTimes} className={styles.LeftmyCheckInput} disabled={true}/>
            </div>) : null
        }
        <br />
        {/*暂时注销了下面的表格信息*/}
        {/*<Table*/}
          {/*bordered*/}
          {/*dataSource={dataSource}*/}
          {/*columns={columns}*/}
        {/*/>*/}

      </div>
    )
  }
}

function mapStateToProps(EPatrol) {
  return EPatrol;     //namespace
}
export default connect(mapStateToProps)(checkWorkPage);
