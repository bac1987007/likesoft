import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import styles from '../Equipment/deviceManagement.less';
var windowWidth;
var pieText;
export default class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.setPieOption = this.setPieOption.bind(this);
    this.initPieChart = this.initPieChart.bind(this);
  }

  initPieChart() {
    //转换name valu赋值问题
    const oldData = this.props.data;
    const data = [];
    if(oldData.length>=1){
      for (var i = 0; i < oldData.length; i++) {
        data.push({"value":Number(oldData[i].issueRate) ,"name":oldData[i].issueTypeCn});
      }
    }
    //获取屏幕的宽度，来判断是否显示pie的text
    windowWidth = $(window).width();
    $(window).resize(function(){
      windowWidth = $(window).width();
    });
    if(windowWidth<=650){
      pieText = "";
    }else{
      pieText = "问题类型占比"
    }
    const myChart = echarts.init(this.refs.pieChart);
    window.onresize = myChart.resize;
    const options = this.setPieOption(data);
    myChart.setOption(options);
  }
  componentWillMount(){
    //获取屏幕的宽度，来判断是否显示pie的text
    // windowWidth = $(window).width();
    // $(window).resize(function(){
    //   windowWidth = $(window).width();
    // });
    // if(windowWidth<=650){
    //   pieText = "";
    // }else{
    //   pieText = "问题类型占比"
    // }
  }
  componentDidMount() {
    this.initPieChart();
  }

  componentDidUpdate() {
    this.initPieChart();
  }

  render() {
    return (
      <div className="pie-react" style={{width:"400px",float:"left"}}>
        <div ref="pieChart"  className={styles.pie}/>
      </div>
    );
  }

  setPieOption(data) {
    return {
      title: {
        text:pieText,
        left: 'center',
      },
      color:['#f58345', '#F5EF45','#45F3F5'],
      series: [
        {
          name: '比例',
          type: 'pie',
          // roseType: 'angle',
          data,
          center: ['52%', '55%'],
          label: {
            normal: {
              formatter: '{d}% \n{b}',
            },
            labelLine: {
              show: true,
            }
          },
        },
      ],
    };
  }
}
