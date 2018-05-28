/**
 * Created by zhang on 2017/12/21.
 */
import React from 'react';
import { connect } from 'dva';

const ReactDOM = require('react-dom');

import moment from 'moment';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/dark';
// 引入折线图。
import 'echarts/lib/chart/line';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import { Form, Input, Button, Icon, Tabs, Select, DatePicker } from 'antd';
import styles from './EPatrol.css';

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

let ypTypeListSel = [];  // 样品
let qualityProListSel = []; // 质检项目
let currentSelType = 'SPEC';
// 定义数据变量
let LineDataInfo = {};
let title = {};
let tooltip = {};
let series = [];
let legend = {};
let xAxis = {};
let yAxis = {};

let currentdate;// 当前时间
let currentdateSta;  // 当前时间减8个小时
class EchartLine extends React.Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.mainContent)).css({
      height: $(window).height() - 100,
      overflow: 'auto',
      overflowX: 'hidden',
    });
    $(window).resize(() => {
      $(ReactDOM.findDOMNode(this.refs.mainContent)).css({
        height: $(window).height() - 100,
        overflow: 'auto',
        overflowX: 'hidden',
      });
    });
  }

  // 查询样品类型
  ypType = () => {
    this.props.dispatch({
      type: 'EPatrol/ypType',
      payload: {},
    });
  };
  qualityPro = () => {
    this.props.dispatch({
      type: 'EPatrol/qualityPro',
      payload: {},
    });
  };

  componentWillMount() {
    this.ypType();// 获取样品类型下拉框
    this.qualityPro(); // 获取质检项目
    this.getNowFormatDate();
  }

  // 初始化更新数据
  DidUpdateFun = () => {
    const { LineData, LineTypeData } = this.props.EPatrol;
    const myChart = echarts.init(document.getElementById('main'), 'dark');
    if (currentSelType == 'SPEC') { // 按样品处理
      if (LineData && LineData != '' && LineData.series) {
        LineDataInfo = LineData;
      } else {
        LineDataInfo = {};
      }
    } else { // 按项目类型赋值
      if (LineTypeData && LineTypeData != '' && LineTypeData.series) {
        LineDataInfo = LineTypeData;
      } else {
        LineDataInfo = {};
      }
    }
    title = LineDataInfo.title || {};
    tooltip = LineDataInfo.tooltip || {};
    legend = LineDataInfo.legend || {};
    xAxis = LineDataInfo.xAxis || {};
    yAxis = LineDataInfo.yAxis || {};
    if (LineDataInfo.series && LineDataInfo.series.length > 0) {
      series = [];
      for (let i = 0; i < LineDataInfo.series.length; i++) {
        series.push(LineDataInfo.series[i]);
      }
    } else {
      series = [];
    }
    myChart.clear();
    const Option = {
      title: {
        text: title.text,
        subtext: title.subtext,
      },
      tooltip,
      legend: {
        data: legend.data,
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}, // 保存方法
        },
      },
      xAxis,
      yAxis,
      series,
    };
    myChart.setOption(Option);
  };

  componentDidUpdate() {
    this.DidUpdateFun();
  }

  // 样品类型查询
  thisdispatch = (key) => {
    this.props.dispatch({
      type: 'EPatrol/getLineDataSel',
      payload: {
        specType: key,
      },
    });
  };
  // 质检类型查询
  thisdispatchType = (key) => {
    this.props.dispatch({
      type: 'EPatrol/thisdispatchType',
      payload: {
        qiItemName: key,
      },
    });
  };
  // 时间改变
  TimeChangeS1 = (value, string) => {
    this.props.dispatch({
      type: 'EPatrol/addDcitemMeth',
      payload: {
        TimeChangeS1: string,
      },
    });
  };
  TimeChangeS2 = (value, string) => {
    this.props.dispatch({
      type: 'EPatrol/addDcitemMeth',
      payload: {
        TimeChangeS2: string,
      },
    });
  };
  TimeChangeS3 = (value, string) => {
    this.props.dispatch({
      type: 'EPatrol/addDcitemMeth',
      payload: {
        TimeChangeS3: string,
      },
    });
  };
  TimeChangeS4 = (value, string) => {
    this.props.dispatch({
      type: 'EPatrol/addDcitemMeth',
      payload: {
        TimeChangeS4: string,
      },
    });
  };
  // 获取当前时间
  getNowFormatDate = () => {
    const date = new Date();
    const seperator1 = '-';
    const seperator2 = ':';
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let hours = date.getHours();
    let hours2 = date.getHours() - 8;
    let Minutes = date.getMinutes();
    let Seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
      month = `0${month}`;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = `0${strDate}`;
    }
    if (hours >= 1 && hours <= 9) {
      hours = `0${hours}`;
    }
    if (hours2 >= 1 && hours2 <= 9) {
      hours2 = `0${hours2}`;
    }
    if (Minutes >= 1 && Minutes <= 9) {
      Minutes = `0${Minutes}`;
    }
    if (Seconds >= 1 && Seconds <= 9) {
      Seconds = `0${Seconds}`;
    }
    currentdate = `${date.getFullYear() + seperator1 + month + seperator1 + strDate
       } ${hours}${seperator2}${Minutes
       }${seperator2}${Seconds}`;
    currentdateSta = `${date.getFullYear() + seperator1 + month + seperator1 + strDate
       } ${hours2}${seperator2}${Minutes
       }${seperator2}${Seconds}`;
    // return currentdate;
  };
  // 按样品查询按钮（样品查询）
  serchSpecLine = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch, EPatrol } = this.props;
    const { TimeChangeS1, TimeChangeS2 } = EPatrol;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const formValue = { ...values };
      formValue.startTime = TimeChangeS1;
      formValue.endTime = TimeChangeS2;
      // 查询
      dispatch({
        type: 'EPatrol/getLineData',
        payload: formValue,
      });
    });
  };
  // 按照质检项目查询
  getLineTypeData = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch, EPatrol } = this.props;
    const { TimeChangeS3, TimeChangeS4 } = EPatrol;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const formValue = { ...values };
      formValue.startTime = TimeChangeS3;
      formValue.endTime = TimeChangeS4;
      // 提交
      dispatch({
        type: 'EPatrol/getLineTypeData',
        payload: formValue,
      });
    });
  };
  // 按钮控制隐藏显示
  specTypeFun = () => {
    currentSelType = 'SPEC';
    document.getElementById('specBox').style.display = 'inline-block';
    document.getElementById('proBox').style.display = 'none';
    this.DidUpdateFun();
  };
  proTypeFun = () => {
    currentSelType = 'PRO';
    document.getElementById('specBox').style.display = 'none';
    document.getElementById('proBox').style.display = 'inline-block';
    this.DidUpdateFun();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { ypTypeList, qualityProList } = this.props.EPatrol;
    // 样品list
    if (ypTypeList[0] && ypTypeList[0].itemCode) {
      const ypTypeListOpt = ypTypeList[0].itemCode;
      ypTypeListSel = ypTypeListOpt.map(obj => <Option key={obj._ID}>{obj._CN}</Option>);
    } else {
      ypTypeListSel = [];
    }
    // 质检项目select  qualityProListSel
    if (qualityProList && qualityProList.length > 0) {
      qualityProListSel = qualityProList.map(obj => <Option key={obj}>{obj}</Option>);
    } else {
      qualityProListSel = [];
    }
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <div className={styles.textAli}>
          <Button className={styles.mrLeft10} onClick={this.specTypeFun}>样品类型</Button>
          <Button className={styles.mrLeft10} onClick={this.proTypeFun}>项目类型</Button>
        </div>
        <div id="specBox" className={styles.formSet}>
          <Form layout="inline">
            {/* <DatePicker defaultValue={moment(currentdate, dateFormat)} format={dateFormat} />*/}
            <FormItem
              label="样品类型"
              {...formItemLayout}
            >
              {getFieldDecorator('specType', {
                initialValue: '',   // 定义初始值
              })(
                <Select
                  showSearch
                  onSelect={this.thisdispatch}
                  placeholder="请选择样品类型"
                  style={{ width: 150 }}
                >
                  {ypTypeListSel}
                </Select>,
              )}
            </FormItem>
            <FormItem
              label="开始时间"
              {...formItemLayout}
            >
              <DatePicker
                onChange={this.TimeChangeS1}
                showTime
                defaultValue={moment(currentdateSta, dateFormat)} format={dateFormat}
              />
            </FormItem>
            <FormItem
              label="结束时间"
              {...formItemLayout}
            >
              <DatePicker
                onChange={this.TimeChangeS2}
                showTime
                defaultValue={moment(currentdate, dateFormat)} format={dateFormat}
              />
            </FormItem>
            <Button icon="search" onClick={this.serchSpecLine} className={styles.mrLeft20}>查询</Button>
          </Form>
          {/* <h3 className={styles.Color333}>选择样品及起始时间查看图表信息</h3>*/}
        </div>
        <div id="proBox" className={styles.formSet} style={{ display: 'none' }}>
          <Form layout="inline">
            <FormItem
              label="质检项目"
              {...formItemLayout}
            >
              {getFieldDecorator('qiItemName', {
                initialValue: '',   // 定义初始值
              })(
                <Select
                  showSearch
                  placeholder="请选择质检类型"
                  onSelect={this.thisdispatchType}
                  style={{ width: 150 }}
                >
                  {qualityProListSel}
                </Select>,
              )}
            </FormItem>
            <FormItem
              label="开始时间"
              {...formItemLayout}
            >
              <DatePicker
                onChange={this.TimeChangeS3}
                showTime
                defaultValue={moment(currentdateSta, dateFormat)} format={dateFormat}
              />
            </FormItem>
            <FormItem
              label="结束时间"
              {...formItemLayout}
            >
              <DatePicker
                onChange={this.TimeChangeS4}
                showTime
                defaultValue={moment(currentdate, dateFormat)} format={dateFormat}
              />
            </FormItem>
            <Button icon="search" onClick={this.getLineTypeData} className={styles.mrLeft20}>查询</Button>
          </Form>
        </div>
        <p id="main" ref="mainContent">
          {this.props.children}
        </p>
      </div>
    );
  }
}

// model中的namespace
function mapStateToProps(EPatrol) {
  return EPatrol;
}

const EchartLineForm = Form.create()(EchartLine);
// 抛出组件
export default connect(mapStateToProps)(EchartLineForm);
