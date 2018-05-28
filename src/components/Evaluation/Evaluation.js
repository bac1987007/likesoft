/**
 * Created by shangxin on 2017/7/25.
 */

import React from 'react';
import { connect } from 'dva';
import { Table, Input,Progress,Button ,Icon } from 'antd';
import styles from '../Equipment/deviceManagement.less';
import styles2 from './evaluation.less';
import Pie from './Echart';

// 列表组件==》先默认为最大组件===>设备异常列表
class EquipmentEvaluation extends React.Component {
  constructor(props) {
    // console.log(props);
    super(props);
    // console.log(props);
    this.columns = [{
      title: '设备名称',
      dataIndex: 'nameModel',
      width: '31%',
      //render: (text, record, index) => {
       // const id = record.deviceId;
       // const devicecn = record.nameModel;
       // return(
         // <a  style={{cursor:"pointer"}} href="javascript:;" onClick={()=>this.handlechangeWork(id,"/weblink/v1/index.html#/maintenanceRecord",devicecn)}>{text}</a>
         //<a  style={{cursor:"pointer"}} href="javascript:;" onClick={()=>this.handlechangeWork(id,"/#/maintenanceRecord",devicecn)}>{text}</a>
       // )
      //}
    }, {
      title: '故障时间',
      dataIndex: 'issueTime',
      width: '29%',
    }, {
      title: '设备运转率',
      dataIndex: 'conditionRate',
      width: '30%',
      render: (text, record, index) => {
        const Percentage = record.conditionRate+"%";
        return(
          <div>
            <span>{Percentage}</span>
            <Icon type="right" style={{float:"right",lineHeight:"18px",color:"#999"}} />
          </div>
        )
      }
    }];
  }

// 点击设备跳转详情页
//   handlechangeWork = (obj, url,objcn) => {
//     localStorage.removeItem('weixiuDeviceId');
//     localStorage.setItem('weixiuDeviceId', obj);
//     localStorage.removeItem('WXDeviceCn');
//     localStorage.setItem('WXDeviceCn', objcn);
//     //const w = window.open('about:_self');
//     location.href = url;
//   }
  //单机行的时候出发
  OnRowClick = (record,index)=>{
    // console.log(record);
    localStorage.removeItem('weixiuDeviceId');
    localStorage.setItem('weixiuDeviceId', record.deviceId);
    localStorage.removeItem('WXDeviceCn');
    localStorage.setItem('WXDeviceCn', record.nameModel);
    //const w = window.open('about:_self');  不能用open手机又bug
    // location.href = "/#/mobileMaintenance";
    location.href = "/weblink/v1/index.html#/mobileMaintenance";
  }
  // 获取信息
  getInfo = (obj) => {
    function p(s) {
      return s < 10 ? '0' + s: s;
    }

    let myDate;
    if(obj==1){
      myDate = new Date();
    }else if(obj==0){
     let  oldTime = new Date().getTime()-7*24*60*60*1000;
      myDate = new Date(oldTime)
    }
    //获取当前年
    let year=myDate.getFullYear();
    //获取当前月
    let month=myDate.getMonth()+1;
    //获取当前日
    let date= myDate.getDate()

    let newTime =year+'-'+p(month)+"-"+p(date);
    this.props.dispatch({
      type: 'Evaluation/query',
      payload: {
        newTime:newTime,
      },
    });
  }
  componentDidMount() {
    this.getInfo(1);
    $("Button").click(function(){
      $("Button").css({color:"#999",borderColor:"#999"});
      $(this).css({color:"#f58345",borderColor:"#f58345"});
    });
  }
  render() {
    const dataList = this.props.Evaluation.dataList;
    // const dataList = [{nameModel:"测试",issueTime:"0h33min",conditionRate:"22"},{nameModel:"测试2",issueTime:"0h33min",conditionRate:"37"}];
   const totalRote = Number(this.props.Evaluation.transInfo);
    // const totalRote = Number("80.00");
    const dataSource = dataList;
    const columns = this.columns;
    const data =  this.props.Evaluation.issueRate;
    return (
      <div className={styles.evaluaPadding}>
        <div style={{marginTop:"20px",fontSize:"14px"}}>
          <span style={{marginLeft:"25px",color:"#333"}}>设备考评时间</span>
          <Button value="small" onClick={()=>this.getInfo(1)} style={{color:"#f58345",borderColor:"#f58345",marginLeft:"15px"}}>本周</Button>
          <Button value="small" onClick={()=>this.getInfo(0)} style={{marginLeft:"22px"}} >上周</Button>
        </div>
       {/*充当空白的div*/}
        <div style={{position:"absolute",width:"22px",height:"53px",background:"#fff",top:"65px",left:"0px",zIndex:"1"}}></div>
        <div style={{position:"absolute",width:"22px",height:"53px",background:"#fff",top:"65px",right:"0px",zIndex:"1"}}></div>
        <Table
          bordered
          rowKey={record => record.registered}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          onRowClick={this.OnRowClick}
          className={styles2.shebeiTable}
          style={{marginTop:"15px",color:"#333"}}
        />
        <div className={styles.phoneShow}>
          <div>
            <p style={{fontSize:"14px",paddingLeft:"25px",marginTop:"20px",color:"#333"}}>问题类型占比</p>
            <Pie
              data={data}
            />
          </div>
          <div className={styles2.shebeiRunRote}>
            <p style={{fontSize:"14px",paddingLeft:"25px",marginBottom:"20px",color:"#333"}}>设备完好率</p>
            <Progress percent={totalRote} status="active" strokeWidth={20} style={{width:"90%",left:"5%",fontSize:"14px"}}/>
          </div>
        </div>
        <div className={styles.PCechartShow}>
          <div className={styles.PCshow}>
            <div style={{marginTop:"20px",textAlign:"center"}}>
              <Progress type="circle" percent={totalRote} width={150} style={{margin:"0 auto"}}/>
              <div style={{fontSize:"16px"}}>设备完好率</div>
            </div>
          </div>
          <Pie
            data={data}
          />
        </div>
      </div>


    );
  }
}
/*<ul style={{ width: 300, marginTop: 30 }}>
 <li>
 <span style={{ textAlign: 'right', width: 120, fontSize: 15, display: 'inline-block' }}>设备完好率</span>
 <Input style={{ width: 100, marginLeft: 5 }} disabled />
 </li>
 <li style={{ marginTop: 10 }}>
 <span style={{ textAlign: 'right', width: 120, fontSize: 15, display: 'inline-block' }}>运转率</span>
 <Input style={{ width: 100, marginLeft: 5 }} disabled />
 </li>
 </ul>*/
// ReactDOM.render(<EditableTable />, mountNode);
// 与model层建立数据联系
function mapStateToProps(Evaluation) {
  return Evaluation;
}

// const deviceManagementForm = Form.create()(deviceManagement);

export default connect(mapStateToProps)(EquipmentEvaluation);

