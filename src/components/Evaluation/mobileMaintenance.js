//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖镇楼                  BUG辟易
//          佛曰:
//                  写字楼里写字间，写字间里程序员；
//                  程序人员写程序，又拿程序换酒钱。
//                  酒醒只在网上坐，酒醉还来网下眠；
//                  酒醉酒醒日复日，网上网下年复年。
//                  但愿老死电脑间，不愿鞠躬老板前；
//                  奔驰宝马贵者趣，公交自行程序员。
//                  别人笑我忒疯癫，我笑自己命太贱；
//                  不见满街漂亮妹，哪个归得程序员？

/**
 * Created by shangxin on 2017/8/22.
 */

import React from 'react';
import { connect } from 'dva';
import { Icon,Modal,Button } from 'antd';
import styles from './mobileMaintenance.less';
var AndroldeviceId;
var Androldevicecn;
class mobileMaintenance extends React.Component {
  // constructor(props) {
  //   super(props);
  state = {
    visible: false,
    taskTitle:"",
    execMem:"",
  }
  showModal = (obj) => {
    // console.log(obj);
    this.setState({
      visible: true,
      taskTitle:obj.taskTitle,
      execMem:obj.execMem?obj.execMem:"该设备暂无维修记录!"
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
    AndroldeviceId =  this.props.location.query.deviceId;
    Androldevicecn =  this.props.location.query.deviceCn;

  // }
  // 加载完成后执行数据列表查询,更新model
  componentWillMount() {
    const weixiuDeviceId = localStorage.getItem('weixiuDeviceId');

    this.props.dispatch({
      type: 'Evaluation/queryrepair',
      payload: {
        weixiuDeviceId,
      },
    });
    //衔接安卓的model更新

    if(AndroldeviceId){
      this.props.dispatch({
        type: 'Evaluation/queryrepair',
        payload: {
          AndroldeviceId,
        },
      });
    }
  }
  componentDidUpdate() {
    let deviceHeight = $(window).height();
    let containerDivHeight = $("#mobileDetail").height();
    if(deviceHeight>=containerDivHeight){
      $("#maintenan").css({height:deviceHeight});
    }else{
      $("#maintenan").css({height:"auto",paddingBottom:"10px"});
    }
  }
  render() {
    let WXDeviceCn;
    if(Androldevicecn){
      WXDeviceCn = Androldevicecn;
    }else{
      WXDeviceCn = localStorage.getItem('WXDeviceCn');
    }
    const { repairList } = this.props.Evaluation;
    const dataSource = repairList;
    // console.log(dataSource);
    const dataList = dataSource.map((obj)=>

      obj.endDttm? <li key={obj.taskId} onClick={()=>this.showModal(obj)}>
        <p>{obj.taskTitle}</p>
        <p><span>创建时间:{obj.beginDttm.substring(6, 16)}</span>
          <span className="endTime" style={{float:"right",marginRight:"54px"}}>完成时间:{obj.endDttm.substring(6, 16)}</span></p>
        <Icon type="right" className={styles.arrowRight}/>
      </li>:
        <li key={obj.taskId} onClick={()=>this.showModal(obj)}>
          <p>{obj.taskTitle}</p>
          <p><span>创建时间:{obj.beginDttm.substring(6, 16)}</span>
            <span className="endTime" style={{
              float: "right",
              marginRight: "54px"
            }}>完成时间:<span style={{color:"#f58345"}}>未完成</span></span></p>
          <Icon type="right" className={styles.arrowRight}/>
        </li>
  );
    return (
      <div id="maintenan" style={{width:"100%",height:"100%",background:"#f0f0f0",paddingTop:"10px"}}>
        <ul className={styles.ulList}>
          {dataList}
        </ul>
        <Modal
          visible={this.state.visible}
          closable={false}
          onCancel={this.handleCancel}
          footer={null}
        >
          <p style={{textAlign:"center",marginTop:"-2px",color:"#333",fontSize:"15px"}}>{this.state.taskTitle}</p>
          <div style={{fontSize:"14px",lineHeight:"24px",color:"#333",paddingTop:"15px",borderTop:"1px solid #f58345",width:"94%",margin:"10px auto"}}>
            {this.state.execMem}
          </div>
          <Button type="primary" onClick={
            this.handleCancel
          } style={{background:"#f58345",borderColor:"#f58345",margin:"16px 40%"}}>知道了</Button>
        </Modal>
      </div>


    );
  }
}
function mapStateToProps(Evaluation) {
  return Evaluation;
};
export default connect(mapStateToProps)(mobileMaintenance);

