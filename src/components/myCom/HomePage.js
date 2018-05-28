import React from "react";
import {connect} from "dva/index";
import styles from "./homePage.css"
import { Col, Row, DatePicker, Progress, Table, Button, Collapse, Select, Cascader } from 'antd';
import echarts from "echarts/lib/echarts";
import 'echarts/dark';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import Utils from "../../utils/Util";
// import 'rsuite-table/lib/less/index.less';
var dataArr = [],legArr = [],repairdata = [];
var data1 = [], data2 = [];
const { RangePicker } = DatePicker;
// import { RollTable, Column, HeaderCell, Cell } from 'rsuite-table';
var self;
class homePage extends React.Component {
  constructor(props){
    super(props);
    self = this.props;
    this.state = {
      startValue: null,
      endValue: null
    }
    this.columns1 = [{title: '序号',dataIndex: 'xh',},{title: '设备',dataIndex: 'sb',},
      {title: '维修次数',dataIndex: 'wxcs',defaultSortOrder: 'descend',sorter: (a, b) => a.age - b.age,},
      {title: '更换次数',dataIndex: 'ghcs'}, {title: '总计',dataIndex: 'zj',}];
    this.columns2 = [{title: '设备',dataIndex: 'sb',},{title: '部位',dataIndex: 'bw',},
      {title: '故障说明',dataIndex: 'gzsm'},
      {title: '维修时间',dataIndex: 'wxsj'}, {title: '维修人',dataIndex: 'wxr'}];
  }
  componentDidUpdate(){
    let ss= this.state.startValue
    const {Repair,Failure} = this.props.HomePage;
    dataArr = [], legArr = [], repairdata = [],data1=[],data2=[];
    const color = ['#09E697','#4BB7FA','#FF6702','#1D5ADD'];
    for (var i = 0 ; i<Failure.length ; i++){
      dataArr.push({"value":Failure[i].num,"name":Failure[i].repairTypeName,"itemStyle":{"normal":{"label":{"textStyle":{"color":color[i]}}}
        }});
    }
    if(Failure.length>0){
      legArr.push([Failure[0].repairTypeName,Failure[1].repairTypeName,
        Failure[2].repairTypeName,Failure[3].repairTypeName]);
      var myChart = echarts.init(document.getElementById('main'), 'dark');
      const Option1 = this.setBar1();
      myChart.setOption(Option1);
    }
    if(Repair!=null){
      repairdata.push([Repair.planCount,Repair.doneCount,Repair.doingCount,Repair.undoCount]);
      var myChart2 = echarts.init(document.getElementById('main2'), 'dark');
      const Option2 = this.setBar2();
      myChart2.setOption(Option2);
    }
  }
  setBar1(){
    return{
      title: {
        text: '故障占比率',
        x: 'center',
        y: '35%',
        itemGap: 20,
        textStyle : {
          color : '#666',
          fontFamily : '微软雅黑',
          fontSize : 12,
        }
      },
      backgroundColor: '#ffffff',
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        top:"bottom",
        data:legArr,
        textStyle: {
          color: '#333333',
          fontSize: 12
        },
        formatter: function (name) {
          return name;
        }
      },
      color:['#09E697','#4BB7FA','#FF6702','#1D5ADD'],
      series: [
        {
          startAngle:"200",
          name:'故障类型',
          type:'pie',
          center : ['50%', 100],
          radius: ['35%', '45%'],
          x: '10%',
          width: '35%',
          funnelAlign: 'left',
          max: 300,
          data:dataArr,
        }
      ]
    }
  }
  numToStr(num){
    if(num<10) return "0"+num.toString();
    return num.toString()
  }
  setBar2() {
    return {
      backgroundColor: '#fff',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      legend: {
        x: 'center',
        data: ['计划检修', '已检修', '检修中', '待检修'],
      },
      xAxis: [
        {
          type: 'category',
          data: ['计划检修', '已检修', '检修中', '待检修'],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#000'
            },
            interval: 0,
            rotate: 40
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#222'
            }
          }
        }
      ],
      series: [
        {
          barWidth: 10,
          name: '数量',
          type: 'bar',
          itemStyle:{normal:{color:'#09E697'}},
          data: repairdata[0]
        },{
          barWidth: 10,
          name: '数量',
          type: 'bar',
          itemStyle:{normal:{color:'#4BB7FA'}},
          data: repairdata[1]
        },{
          barWidth: 10,
          name: '数量',
          type: 'bar',
          itemStyle:{normal:{color:'#FF6702'}},
          data: repairdata[2]
        },{
          barWidth: 10,
          name: '数量',
          type: 'bar',
          itemStyle:{normal:{color:'#1D5ADD'}},
          data: repairdata[3]
        }
      ]
    }
  }
  timestampToTime(timestamp) {
    let date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+M+D;
  }
  listOnChange = (dateString) => {
    if(dateString[0] != ''){
      self.dispatch({type:'HomePage/getRepairList',payload:{startTime:this.timestampToTime(dateString[0]),endTime:this.timestampToTime(dateString[1])}});
    }
  }
  repairOnChange = (dateString) => {
    if(dateString[0] != ''){
      self.dispatch({type:'HomePage/getFailureRate',payload:{startTime:this.timestampToTime(dateString[0]),endTime:this.timestampToTime(dateString[1])}});
    }
  }
  stateOnChange = (dateString) => {
    if(dateString[0] != ''){
      self.dispatch({type:'HomePage/getRepair',payload:{startTime:this.timestampToTime(dateString[0]),endTime:this.timestampToTime(dateString[1])}});
    }
  }
  casDataChange = (label) => {
    self.dispatch({
      type: 'HomePage/getInspectData',
      payload: {"checkTime":label[1].label,"deptId":label[0].key}
    })
  }
  OnRowClick (index){
    self.dispatch({
      type: 'EPatrol/getRepairInfo',
      payload: {"deviceId":index.deviceId,"nameModel":index.sb}
    })
  }
  render() {

    const columns2 = this.columns2; const columns1 = this.columns1;
    const {RepairList,modelInfo,modelName,Per} = this.props.HomePage;
    data1=[],data2=[];
    for (var i = 0 ; i<RepairList.length ; i++){
      data1.push({key: i,xh: i,sb:RepairList[i].nameModel,wxcs: RepairList[i].repairNum,ghcs: RepairList[i].changeNum,
        zj: RepairList[i].repairNum+RepairList[i].changeNum,deviceId:RepairList[i].deviceId})
    }
    for (var i = 0 ; i<modelInfo.length ; i++){
      data2.push({key: i,sb: modelName,bw:modelInfo[i].taskTypeLink,gzsm:modelInfo[i].issueTypeCn, wxsj:modelInfo[i].beginDttm,wxr:modelInfo[i].executor})
    }
    for (var i = 0 ; i<RepairList.length ; i++){
      data1.push({key: i,xh: i,sb:RepairList[i].nameModel,wxcs: RepairList[i].repairNum,ghcs: RepairList[i].changeNum,
        zj: RepairList[i].repairNum+RepairList[i].changeNum,deviceId:RepairList[i].deviceId})
    }
    const {InspectInfo,ldData} = this.props.HomePage;
    let casOption = [], list = [];
    for(let i=0;i<ldData.length;i++){
      if(ldData[i].times.length>0) {
        let children = [];
        let num = ldData[i].times.length;
        for(let j=0;j<num;j++){
          children.push({"value":"time"+j.toString(),"label":ldData[i].times[j]});
        }
        casOption.push({"value":"place"+i.toString(),"label":ldData[i].value,"key":ldData[i].key,"children":children})
      }
    }
    for (let i = 0 ; i<InspectInfo.length ; i++){
      list.push({"deviceName":InspectInfo[i].checkLineName,"inspector":"王亚文"/*InspectInfo[i].inspector*/,
        "deviceCount":InspectInfo[i].deviceCount,"deviceInspectCount":InspectInfo[i].deviceInspectCount,
        "undoCount":InspectInfo[i].undoCount,"color":"styles.bgdiv"+i.toString()})
    }
    return(
      <div className={styles.mainh}>
        <Row gutter={16}>
          <Col span={6} className={styles.col1}>
            <div className={styles.shadow}>
              <div className={styles.headh}>
                <Col offset={1} span={23}>
                  <p className={styles.p1}>巡检情况</p>
                  <Cascader options={casOption} onChange={this.casDataChange} size="small" defaultValue={['place1', 'time1']}
                            className={styles.ld} />
                </Col>
              </div>
              <ul>
                {
                  list.map((item,i) => (
                    <li key={i}>
                      <div className={styles.listDiv}>
                        <div className={styles.head1}>
                          <div className={styles.bgdiv1}></div>
                          <p className={styles.listP1}>{item.deviceName}</p>
                          <p className={styles.listP2}>巡检员:</p>
                          <p className={styles.listP21}>{item.inspector}</p>
                        </div>
                        <div className={styles.head2}>
                          <p className={styles.listP3}>{item.deviceCount}</p>
                          <p className={styles.listP4}>{item.deviceInspectCount}</p>
                          <p className={styles.listP5}>{item.undoCount}</p>
                        </div>
                        <div className={styles.head2}>
                          <p className={styles.listP6}>设备总数</p>
                          <p className={styles.listP7}>未巡检设备</p>
                          <p className={styles.listP8}>已巡检设备</p>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </Col>
          <Col span={6} className={styles.pright}>
            <Col span={24} className={styles.col1}>
              <div className={styles.shadow}>
                <div className={styles.headh}>
                  <Col offset={1} span={23}>
                    <p className={styles.p1}>故障占比率</p>
                    <div className={styles.inDiv}>
                      <RangePicker className={styles.list}format="YYYY-MM-DD" size="small" onChange={this.repairOnChange}/>
                    </div>
                  </Col>
                </div>
                <div id="main" className={styles.pie} style={{ height: "230px"}}></div>
                <div className={styles.headb}>
                  <Col offset={1} span={23}>
                    <p className={styles.p1}>设备完好率</p>
                  </Col>
                </div>
                <div className={styles.coh2}>
                  <Col offset={1} span={20}>
                    <Progress percent={Per}  status="active" strokeWidth={15}/>
                  </Col>
                </div>
              </div>
            </Col>
          </Col>
          <Col span={6}>
            <Col span={24} className={styles.col1}>
              <div className={styles.shadow}>
                <div className={styles.headh}>
                  <Col offset={1} span={23}>
                    <p className={styles.p1}>维修状态</p>
                    <div className={styles.inDiv}>
                      <RangePicker className={styles.list} format="YYYY-MM-DD" size="small" onChange={this.stateOnChange}/>
                    </div>
                  </Col>
                </div>
                <div>
                  <div id="main2" className={styles.pie} style={{ height: "270px"}}></div>
                </div>
              </div>
            </Col>
          </Col>
          <Col span={6} className={styles.col1}>
            <div className={styles.shadow}>
              <div className={styles.headh}>
                <Col offset={1} span={23}>
                  <p className={styles.p1}>润滑状况</p>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={16} className={styles.h10}>
          <Col span={9} className={styles.col2}>
            <div className={styles.shadow}>
              <div className={styles.headh}>
                <p className={styles.p2}>设备故障列表</p>
                <div className={styles.inDiv}>
                  <RangePicker className={styles.rp} format="YYYY-MM-DD" size="small" onChange={this.listOnChange}/>
                </div>
              </div>
              <Table columns={columns1} dataSource={data1} scroll={{ y: 135 }} pagination={false} onRowClick={this.OnRowClick} size={'small'}/>
          </div>
          </Col>
          <Col span={15} className={styles.pright}>
            <Col span={24} className={styles.col2}>
              <div className={styles.shadow}>
                <div className={styles.headh}>
                  <p className={styles.p2}>{modelName}维修记录</p>
                </div>
                <Table columns={columns2} dataSource={data2} scroll={{ y: 135 }} pagination={false} size={'small'}/>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    )
  }
}
function mapStateToProps(kkk) {
  return kkk;
}

export default connect(mapStateToProps)(homePage);
