/**
 * Created by zhangfuchaun on 2017/8/7.
 */
import React from 'react';
import { connect } from 'dva';
import { Util, AntModal, MockData } from '../../utils/CommonUtil';
import { Input, Row, Col  ,Button,Form,Icon,Radio,Collapse,Modal,Timeline   } from 'antd';
import WorkOrder from './workOrderModal'
import styles from './EPatrol.css';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
var taskId;
class workOrder extends React.Component{
  constructor(props) {
    super(props);
    taskId = this.props.location.query.taskId;
    this.props.dispatch({
      type: 'EPatrol/executeGetInfoMeth',
      payload: {taskId:taskId},
    });
  }
  componentDidMount(){
    this.props.dispatch({
      type: 'EPatrol/executeGetInfo',
      payload: {taskId},
    });
    this.props.dispatch({
      type: 'EPatrol/timelineGetInfo',
      payload: {taskId},
    });
  }

  render(){
    const bizRoleId = this.props.location.query.bizRoleId;
    const { TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const { executeInfo } = this.props.EPatrol;

    //巡检结果
    const collectInfo = executeInfo.checkLog ? executeInfo.checkLog.collectInfo : null;
    const collectInfoStr = collectInfo + "";
    const collectInfoObj = collectInfoStr.split(":",2)[0];
    // const collectInfoColor = collectInfoStr.split(":",2)[1];
    // console.log(collectInfoColor);
    //巡检员checkLog音频
    const checkLogAudio = executeInfo.checkLog && executeInfo.checkLog.ckVoice!=null ? executeInfo.checkLog.ckVoice : null;
    const checkLogAudioStr = checkLogAudio + "";
    const checkLogAudioObj = checkLogAudioStr.split(";",1)[0];
    //巡检员checkLog视频
    const checkLogVideo = executeInfo.checkLog && executeInfo.checkLog.ckVideo!=null ? executeInfo.checkLog.ckVideo : null;
    const checkLogVideoStr = checkLogVideo + "";
    const checkLogVideoObj = checkLogVideoStr.split(";",2)[0];
    const checkLogVideoPng = checkLogVideoStr.split(";",2)[1];
    //值班长task图片
    const taskImgSrc = executeInfo.task &&  executeInfo.task.taskImg ? executeInfo.task.taskImg : "";
    const taskImgSrcStr = taskImgSrc+"";
    const taskImgObj = taskImgSrcStr.split(";");
    //task音频
    const audioSrc =  executeInfo.task && executeInfo.task.taskVoice!=null ? executeInfo.task.taskVoice : null;
    const audioSrcStr = audioSrc + "";
    const audioSrcObj = audioSrcStr.split(";",1)[0];
    //task视频
    const videoSrc =executeInfo.task && executeInfo.task.taskVideo!=null ? executeInfo.task.taskVideo : null ;
    const videoSrcStr = videoSrc + "";
    const videoSrcObj = videoSrcStr.split(";",2)[0];
    const videoSrcPng = videoSrcStr.split(";",2)[1];
    //维修工taskLog音频
    const tasklogAudioSrc =  executeInfo.taskLog && executeInfo.taskLog.taskVoice!=null ? executeInfo.taskLog.taskVoice : null;
    const tasklogAudioSrcStr = tasklogAudioSrc+"";
    const tasklogAudioObj = tasklogAudioSrcStr.split(";",1)[0];
    //维修工taskLog视频
    const tasklogVideoSrc =  executeInfo.taskLog && executeInfo.taskLog.taskVideo!=null ? executeInfo.taskLog.taskVideo : null;
    const tasklogVideoSrcStr = tasklogVideoSrc+"";
    const tasklogVideoObj = tasklogVideoSrcStr.split(";",2)[0];
    const tasklogVideoPng = tasklogVideoSrcStr.split(";",2)[1];
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18},
    };
    const customPanelStyle = {
      background: '#FFF',
      borderRadius: 4,
      marginBottom: 4,
      borderBottom: "4px solid #F0F0F0",
      fontSize:14,
    };
    function BigckImg1() {
      const taskImgC1 = taskImgObj[0].replace(/EWORK1/,"EWORK2");
      Modal.success({
        // title: 'This is a success message',
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC1} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg2() {
      const taskImgC2 = taskImgObj[1].replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC2} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg3() {
      const taskImgC3 = taskImgObj[2].replace(/EWORK1/,"EWORK2");
      Modal.success({
        // title: 'This is a success message',
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC3} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg4() {
      const taskImgC4 = taskImgObj[3].replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC4} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg5() {
      const taskImgC5 = executeInfo.checkLog.ckImg1.replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC5} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg6() {
      const taskImgC6 = executeInfo.checkLog.ckImg2.replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC6} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg7() {
      const taskImgC7 = executeInfo.checkLog.ckImg3.replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC7} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg8() {
      const taskImgC8 = executeInfo.checkLog.ckImg4.replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC8} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg9() {
      const taskImgC9 = executeInfo.taskLog.img1.replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC9} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg10() {
      const taskImgC10 = executeInfo.taskLog.img2.replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC10} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg11() {
      const taskImgC11 = executeInfo.taskLog.img3.replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC11} className={styles.workOrderBigImg} /> ,
      });
    }
    function BigckImg12() {
      const taskImgC12 = executeInfo.taskLog.img4.replace(/EWORK1/,"EWORK2");
      Modal.success({
        okText:"返回",
        maskClosable:true,
        iconType:null,
        content: <img src={taskImgC12} className={styles.workOrderBigImg} /> ,
      });
    }
    const taskPriority = executeInfo.task && executeInfo.task.taskPriority ? executeInfo.task.taskPriority : null;
    if (taskPriority == "10") {
      document.getElementById("titIcon").style.background = 'red';
    }else if (taskPriority == "20"){
      document.getElementById("titIcon").style.background = 'yellow';
    }else if (taskPriority == "30") {
      document.getElementById("titIcon").style.background = 'orange';
    }else {
    }
    var titIconStyle = {
      display: 'inline-block',
      width: '15px',
      height: '15px',
      borderRadius:'50%',
      marginRight:'5px',
    };

    const { timelineInfo } = this.props.EPatrol;   //执行记录
    // if (timelineInfo == undefined || timelineInfo == "" ||timelineInfo==null){
    //   return (<div>1</div>);
    // }

    return(
      <div className={styles.workOrderMain}>
        <Form>
          <FormItem
            colon={false}
            label={<div style={{marginRight:5}}><p id="titIcon" style={titIconStyle}></p>标题</div>}
            {...formItemLayout}
            className={styles.workOrderTit2}
          >
            {getFieldDecorator('taskTitle', {    //prodName==>定义唯一ID，也是key
              initialValue:executeInfo.task ? executeInfo.task.taskTitle : null,   //定义初始值
            })(
              <Input
                type="text"
                disabled={true}
                className={styles.borderNone}
                style={{fontSize:13}}
              />,
            )}
          </FormItem>
          <Collapse bordered={false} defaultActiveKey={['5']}>
            {
              executeInfo.bizType =="10"?(
                <Panel header="巡检信息" key="1"  style={customPanelStyle} className={styles.borderBottom}>
                  <FormItem
                    label="巡检设备"
                    {...formItemLayout}
                    className={styles.workOrderTit}
                  >
                    {getFieldDecorator('checkItem', {    //prodName==>定义唯一ID，也是key
                      initialValue:executeInfo.checkLog ? executeInfo.checkLog.checkItem :null,   //定义初始值
                    })(
                      <Input
                        type="text"
                        disabled={true}
                        className={styles.borderNone}
                        style={{fontSize:13}}
                      />,
                    )}
                  </FormItem>
                  <FormItem
                    label="巡检部位"
                    {...formItemLayout}
                    className={styles.workOrderTit}
                  >
                    {getFieldDecorator('ckPart', {    //prodName==>定义唯一ID，也是key
                      initialValue:executeInfo.checkLog ? executeInfo.checkLog.ckPart : null,   //定义初始值
                    })(
                      <Input
                        type="text"
                        disabled={true}
                        className={styles.borderNone}
                        style={{fontSize:13}}
                      />,
                    )}
                  </FormItem>
                  <FormItem
                    label="巡检时间"
                    {...formItemLayout}
                    className={styles.workOrderTit}
                  >
                    {getFieldDecorator('ckDttm', {    //prodName==>定义唯一ID，也是key
                      initialValue:executeInfo.checkLog ? executeInfo.checkLog.ckDttm : null,   //定义初始值
                    })(
                      <Input
                        type="text"
                        disabled={true}
                        className={styles.borderNone}
                        style={{fontSize:13}}
                      />,
                    )}
                  </FormItem>
                  <FormItem
                    label="巡检内容"
                    {...formItemLayout}
                    className={styles.workOrderTit}
                  >
                    {getFieldDecorator('checkItem', {    //prodName==>定义唯一ID，也是key
                      initialValue:executeInfo.checkLog? executeInfo.checkLog.checkItem :null,   //定义初始值
                    })(
                      <Input
                        type="text"
                        disabled={true}
                        className={styles.borderNone}
                        style={{fontSize:13}}
                      />,
                    )}
                  </FormItem>
                  <FormItem
                    label="巡检结果"
                    {...formItemLayout}
                    className={styles.workOrderTit}
                  >
                    {getFieldDecorator('execOpinionCn', {    //prodName==>定义唯一ID，也是key
                      initialValue:collectInfoObj,   //定义初始值
                    })(
                      <Input
                        type="text"
                        disabled={true}
                        className={styles.borderNone}
                        style={{fontSize:13}}
                      />,
                    )}
                    <div className={styles.workOrderDiv}>
                      <div>
                        {
                          executeInfo.checkLog.ckImg1 ? <img onClick={BigckImg5} src={executeInfo.checkLog.ckImg1} className={styles.workOrderImg} /> : null
                        }
                        {
                          executeInfo.checkLog.ckImg2? <img onClick={BigckImg6} src={executeInfo.checkLog.ckImg2} className={styles.workOrderImg} /> : null
                        }
                        {
                          executeInfo.checkLog.ckImg3 ? <img onClick={BigckImg7} src={executeInfo.checkLog.ckImg3} className={styles.workOrderImg} /> : null
                        }
                        {
                          executeInfo.checkLog.ckImg4 ? <img onClick={BigckImg8} src={executeInfo.checkLog.ckImg4} className={styles.workOrderImg} /> : null
                        }
                      </div>
                      <div className={styles.workOrderHidden}>
                        {
                          checkLogAudioObj ? <audio src={checkLogAudioObj} controls="controls"></audio> : null
                        }
                      </div>
                      <div>
                        {
                          checkLogVideoObj ? <video src={checkLogVideoObj} poster={checkLogVideoPng} width="260px" height="124px" controls="controls"></video> : null
                        }
                      </div>
                    </div>
                  </FormItem>
                  <FormItem
                    label="巡检说明"
                    {...formItemLayout}
                    className={styles.workOrderTit}
                  >
                    {getFieldDecorator('ckDesc', {    //prodName==>定义唯一ID，也是key
                      initialValue:executeInfo.checkLog? executeInfo.checkLog.ckDesc :null,   //定义初始值
                    })(
                      <TextArea  rows={3} disabled={true} className={styles.borderNone} style={{fontSize:13}} />
                    )}
                  </FormItem>
                </Panel>
              ):null
            }
            {
              executeInfo.taskType != 10 ? (
                <Panel header="工单信息" key="2" style={customPanelStyle} className={styles.borderBottom}>
                  <FormItem
                    label="工单类型"
                    {...formItemLayout}
                    className={styles.workOrderTit}
                  >
                    {getFieldDecorator('taskTypeCn', {    //prodName==>定义唯一ID，也是key
                      initialValue:executeInfo.task? executeInfo.task.taskTypeCn : null,   //定义初始值
                    })(
                      <Input
                        type="text"
                        disabled={true}
                        className={styles.borderNone}
                        style={{fontSize:13}}
                      />,
                    )}
                  </FormItem>
                  <FormItem
                    label="工单内容"
                    {...formItemLayout}
                    className={styles.workOrderTit}
                  >
                    {getFieldDecorator('taskDesc', {    //prodName==>定义唯一ID，也是key
                      initialValue:executeInfo.task ? executeInfo.task.taskDesc: null,   //定义初始值
                    })(
                      <TextArea  rows={3} disabled={true}  className={styles.borderNone} style={{fontSize:13}} />
                    )}
                  </FormItem>
                  <FormItem
                    label="完成时间"
                    {...formItemLayout}
                    className={styles.workOrderTit}
                  >
                    {getFieldDecorator('execDttm', {    //prodName==>定义唯一ID，也是key
                      initialValue:executeInfo.task ? executeInfo.task.execDttm: null,   //定义初始值
                    })(
                      <Input
                        type="text"
                        disabled={true}
                        className={styles.borderNone}
                        style={{fontSize:13}}
                      />,
                    )}
                  </FormItem>
                </Panel>
              ) : null
            }
            <Panel header="执行结果" key="3" style={customPanelStyle} className={styles.borderBottom}>
              <div className={styles.workOrderDiv2}>
                <div>
                  {
                    taskImgObj[0]  ? <img onClick={BigckImg1} src={taskImgObj[0]} className={styles.workOrderImg} /> : null
                  }
                  {
                    taskImgObj[1] ? <img onClick={BigckImg2} src={taskImgObj[1]} className={styles.workOrderImg} /> : null
                  }
                  {
                    taskImgObj[2] ? <img onClick={BigckImg3} src={taskImgObj[2]} className={styles.workOrderImg} /> : null
                  }
                  {
                    taskImgObj[3] ? <img onClick={BigckImg4} src={taskImgObj[3]} className={styles.workOrderImg} /> : null
                  }
                </div>
                <div className={styles.workOrderHidden}>
                  {
                    audioSrcObj ? <audio src={audioSrcObj} controls="controls"></audio> : null
                  }
                </div>
                <div>
                  {
                    videoSrcObj ? <video src={videoSrcObj} poster={videoSrcPng} width="260px" height="124px" controls="controls"></video> : null
                  }
                </div>
              </div>
            </Panel>
            <Panel header="执行报告" key="4" style={customPanelStyle} className={styles.borderBottom}>
              <FormItem
                label="执行报告"
                {...formItemLayout}
                className={styles.workOrderTit}
              >
                {getFieldDecorator('execMem', {    //prodName==>定义唯一ID，也是key
                  initialValue:executeInfo.taskLog ? executeInfo.taskLog.execMem :null,   //定义初始值
                })(
                  <TextArea  rows={3} disabled={true} className={styles.borderNone} style={{fontSize:13}} />
                )}
                <div>
                  <br/>
                  {
                    executeInfo.taskLog && executeInfo.taskLog.img1 ? <img onClick={BigckImg9} src={executeInfo.taskLog.img1} className={styles.workOrderImg} /> : null
                  }
                  {
                    executeInfo.taskLog && executeInfo.taskLog.img2 ? <img onClick={BigckImg10} src={executeInfo.taskLog.img2} className={styles.workOrderImg} /> : null
                  }
                  {
                    executeInfo.taskLog && executeInfo.taskLog.img3 ? <img onClick={BigckImg11} src={executeInfo.taskLog.img3} className={styles.workOrderImg} /> : null
                  }
                  {
                    executeInfo.taskLog && executeInfo.taskLog.img4 ? <img onClick={BigckImg12} src={executeInfo.taskLog.img4} className={styles.workOrderImg} /> : null
                  }
                </div>
                <div className={styles.workOrderHidden}>
                  {
                    tasklogAudioObj ? <audio src={tasklogAudioObj} controls="controls"></audio> : null
                  }
                </div>
                <div>
                  {
                    tasklogVideoObj ? <video src={tasklogVideoObj} poster={tasklogVideoPng} width="260px" height="124px" controls="controls"></video> : null
                  }
                </div>
              </FormItem>
            </Panel>
            <Panel header="执行记录" key="5" style={customPanelStyle} className={styles.borderBottom}>
              <Timeline>
                {timelineInfo.map((timeline) => {
                  return (<Timeline.Item key ={ timeline.logId } >
                    <p>{timeline.curTaskLink}</p>
                    <p><span>{timeline.execDttm}</span>——<span>{timeline.executor}</span></p>
                    {
                      timeline && timeline.curTaskLink == "工单派单" ?  timeline.subInfo.map((subInfo)=>{return(<div key={subInfo.taskId}>
                        <br/>
                        <p><span>工单名称:</span>{subInfo.taskTitle}</p>
                        <p>
                          {subInfo.taskStatus != "1" ? <div>工单状态:{subInfo.taskStatusCn}<p><span>当前处理人:{subInfo.executor}</span></p></div>: <span>已完成</span>}
                        </p>
                      </div> )})  :null
                    }
                  </Timeline.Item>)
                })}
              </Timeline>
            </Panel>
          </Collapse>
          {/*工单确认弹出框--确定按钮*/}
          {
            bizRoleId  == "MANAGER" ? <WorkOrder /> : null
          }
        </Form>
      </div>
    );
  }
}


function mapStateToProps(EPatrol) {
  return EPatrol;
}
const GoodsEntryForm = Form.create()(workOrder);

export default connect (mapStateToProps) (GoodsEntryForm);
