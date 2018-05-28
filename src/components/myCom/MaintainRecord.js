/**
 * Created by baiancheng on 2018/4/18
 */
import React from 'react';
import { connect } from 'dva';
import { Col, Row,DatePicker, Select, Progress, Table, Button, } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './maintainRecord.css';
var ReactDOM = require('react-dom');
import echarts from 'echarts/lib/echarts';
import 'echarts/dark';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';

var bingData=[];
var legendData =[] ;
class MaintainRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show1 : false,
      show2 : false
    };
  }
  componentDidUpdate(){
    var myChart = echarts.init(document.getElementById('main'), 'dark');
    const Option = this.setBar();
    myChart.setOption(Option);
    // setTimeout(this.showhide(),1000);
  }
  showhide1(){
    this.setState({
      show1:!this.state.show1
    });
  }
  showhide2(){
    this.setState({
      show2:!this.state.show2
    });
  }
  setBar(){
    return{
      backgroundColor: '#ffffff',
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        top:"bottom",
        data: ['正常', '维修中', '待维修', '停机'],
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
        name:'访问来源',
        type:'pie',
        center : ['50%', 200],
        radius: ['40%', '60%'],
        x: '10%',
        width: '35%',
        funnelAlign: 'left',
        max: 300,
        data:[
          {value:207, name:'正常'},
          {value:53, name:'维修中'},
          {value:6, name:'待维修'},
          {value:3, name:'停机'},
        ]
      }
    ]
    }
  }
  render() {
    const { RangePicker, MonthPicker } = DatePicker;
    const Option = Select.Option;
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    const columns = [{
      title: '设备',
      dataIndex: 'sb',
    }, {
      title: '部位',
      dataIndex: 'bw',
    }, {
      title: '故障说明',
      dataIndex: 'gzsm',
    }, {
      title: '维修次数',
      dataIndex: 'wxcs',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    }, {
      title: '更换次数',
      dataIndex: 'ghcs',
    }];
    const data = [{
      key: '1',
      sb: '石灰石称',
      bw: '减速机',
      wxcs: 12,
      ghcs: 8,
    }, {
      key: '2',
      sb: '熟料',
      bw: '1号泵',
      wxcs: 6,
      ghcs: 13,
    }, ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div className={styles.mainh}>
        <Row gutter={16} className={styles.myrow}>
          <Col span={9} className={styles.col1}>
            <div className={styles.shadow}>
              <div className={styles.headh}>
                <Col offset={1} span={5}>
                  <p className={styles.p1}>故障占比率</p>
                </Col>
                <Col offset={13} span={1}>
                  <Button className={styles.icon1} onClick={this.showhide1} shape="circle" icon="calendar" size="large"/>
                </Col>
                <Col offset={1} span={1}>
                  <Button className={styles.icon1} onClick={this.showhide2}  shape="circle" icon="search" size="large"/>
                </Col>
              </div>
              <div className={styles.conh1} style={{display: this.state.show1 ? "block" : "none"}}>
                <Col offset={1} span={20}>
                  <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
                </Col>
              </div>
              <div className={styles.conh1} style={{display: this.state.show2 ? "block" : "none"}}>
                <Col offset={1} span={20}>
                  <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={handleChange}
                  >
                  {children}
                  </Select>
                </Col>
              </div>
              <div>
                <div id="main" className={styles.pie} style={{ height: "410px"}}></div>
              </div>
              <div className={styles.headb}>
                <Col offset={1} span={5}>
                  <p className={styles.p1}>设备完好率</p>
                </Col>
              </div>
              <div className={styles.coh2}>
                <Col offset={1} span={22}>
                  <Progress percent={98}  status="active" strokeWidth={15}/>
                </Col>
              </div>
            </div>
          </Col>
          <Col span={15} className={styles.col3}>
            <div className={styles.shadow1}>
              <div className={styles.headh}>
                <Col offset={1} span={5}>
                  <p className={styles.p1}>维修记录</p>
                </Col>
              </div>
              <div className={styles.tab1}>
                <Col offset={1} span={22}>
                  <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


function mapStateToProps(maintainRecord) {
  return maintainRecord;
}

export default connect(mapStateToProps)(MaintainRecord);
