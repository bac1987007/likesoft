/**
 * Created by zhangfuchuan on 2017/9/12.
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
// import 'echarts/lib/component/title';
var bingData=[];
var legendData =[] ;
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
    this.getIllegaObjCom();
//因为在手机端初次需要刷新显示，所以增加加载后自动刷新一次的处理方法。
    refresh();
    function refresh(){
     var url = location.href;
      var once = url.split("#");
      // alert(once);
      if (once[2] != 1) {
        url += "#1";
        self.location.replace(url);
        window.location.reload();
      }
    }
    setTimeout('refresh()', 5000);
  }

  getIllegaObjCom =()=>{
    this.props.dispatch({
      type:'EPatrol/getIllegaObj',
      payload:{},
    });
  };

  //render更新完数据之后执行渲染
  componentDidUpdate(){
    var myChart = echarts.init(document.getElementById('main'), 'dark');
    const Option = this.setBar();
    myChart.setOption(Option);
    myChart.on('click', function (params) {
      // window.open('http://localhost/#/IllegalLbs?name=' + encodeURIComponent(params.data.cqType),'_self');
      window.open('/weblink/v1/index.html#/IllegalLbs?name=' + encodeURIComponent(params.data.cqType),'_self');
    });
  }
  setBar(){
    return{
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        // data:['device-cq','device-errorLBS']
        data: legendData
      },
      color:['#f58345','#ffd285','#A73E57'],
      series : [
        {
          name: '点击查看详情',
          type: 'pie',
          // roseType : 'angle',
          radius : '55%',
          center: ['50%', '60%'],
          data:bingData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  render() {
    const {Illegal} = this.props.EPatrol;
    //数据清零重新渲染，避免内容重复。
    bingData=[];
    legendData=[];
    for (var i = 0 ; i<Illegal.length ; i++){
      bingData.push({"value":Illegal[i].cqNum, "name":Illegal[i].typeName,"cqType":Illegal[i].cqType});
    }
    for(var i = 0 ; i<Illegal.length ; i++){
      legendData.push(Illegal[i].typeName);
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
