/**
 * Created by zhangfuchuan on 2017/9/11.
 */
import React from 'react';
import { connect } from 'dva';
var ReactDOM = require('react-dom');
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/dark';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
var xData = [];
var yData = [];
class EchartsTest extends React.Component{
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.mainContent)).css({
      height  : $(window).height(),
      overflow: 'auto',
      overflowX: 'hidden',
    });

    $(window).resize(function () {
      $(ReactDOM.findDOMNode(this.refs.mainContent)).css({
        height  : $(window).height(),
        overflow: 'auto',
        overflowX: 'hidden',
      });
    }.bind(this));
    var name = this.props.location.query.name;
    this.props.dispatch({
      type:'EPatrol/getIllegaObjXq',
      payload:{name},
    });
  }
  //render更新完数据之后执行渲染
  componentDidUpdate(){
    var myChart = echarts.init(document.getElementById('main'), 'dark');
    const Option = this.setBar();
    myChart.setOption(Option);
  }

  setBar(){
    return{
      title: { text: '部门违规数据统计' },
      color:['#f58345'],
      //f58345  . 0229B3  .108EE9
      tooltip: {},
      xAxis: {
        // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        data: xData ? xData : ""
      },
      yAxis: {},
      series: [{
        name: '违规次数',
        type: 'bar',
        // data: [5, 20, 36, 10, 10, 20]
        data: yData ? yData :""
      }]
    }
  }
  render() {
    const {IllegalXq} = this.props.EPatrol;
    //数据清零重新渲染，避免内容重复。
    xData=[];
    yData=[];
    for (var i = 0 ; i<IllegalXq.length ; i++){
      xData.push(IllegalXq[i].deptName);
      yData.push(IllegalXq[i].cqNum);

    }
    return (
      <div id="main"  ref="mainContent">
        {this.props.children}
      </div>
    );
  }
}

//model中的namespace
function mapStateToProps(EPatrol) {
  return EPatrol;
}
//抛出组件
export default connect(mapStateToProps)(EchartsTest);
