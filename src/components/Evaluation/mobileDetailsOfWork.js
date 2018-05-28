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
import { Icon } from 'antd';
import styles from './mobileDetailsOfWork.less';
class mobileMaintenance extends React.Component {
  constructor(props) {
    super(props);
  }
    getOldWorkList = () => {
      this.props.dispatch({
        type: 'Evaluation/mobeilqueryWorkOld',
        payload: {},
      });
    }


    componentDidMount()
    {
      this.getOldWorkList();
    }
    //内容多少区分==》后期可总结为方法
  componentDidUpdate() {
    let deviceHeight = $(window).height();
    let containerDivHeight = $("#mobileDetail").height();
    if(deviceHeight>=containerDivHeight){
      $("#mobileDetail").css({height:deviceHeight});
    }else{
      $("#mobileDetail").css({height:"auto",paddingBottom:"10px"});
    }
  }

    render() {
    const dataSource = this.props.Evaluation.mobeiloldWorkList;
    //写个方法判断颜色  你懂得
      function getColor(obj){
        if(obj==="0"){
          return {color:"yellowgreen"}
        }else if(obj==="1"){
          return {color:"red"}
        }else if(obj==="2"){
          return {color:"#F5850F"}
        }

      };
      //显示正常异常
      function getInfo(obj){
        if(obj==="0"){
          return "正常"
        }else if(obj==="1"){
          return "异常"
        }else if(obj==="2"){
          return "恢复正常"
        }
      }
    const dataList = dataSource.map(obj =>
      obj.collectInfo.substr(0, obj.collectInfo.indexOf(':'))?<li>
          <div>
              <span>巡检部位</span>
              <span>{obj.ckPart}</span>
          </div>
          <div>
              <span>巡检内容</span>
              <span>{obj.checkItem}</span>
          </div>
          <div>
              <span>巡检结果</span>
              <span style={getColor(obj.checkResult)}>
               {obj.collectInfo.substr(0, obj.collectInfo.indexOf(':'))}
               <em>{getInfo(obj.checkResult)}</em>
              </span>


          </div>
          <p>
            <span>巡检员:{obj.userName}</span>
            <span>巡检时间:{obj.ckDttm.substring(6,16)}</span>
          </p>
        </li>:
      <li>
        <div>
          <span>巡检部位</span>
          <span>{obj.ckPart}</span>
        </div>
        <div>
          <span>巡检内容</span>
          <span>{obj.checkItem}</span>
        </div>
        <div>
          <span>巡检结果</span>
          <span style={getColor(obj.checkResult)}>
              无
            <em>{getInfo(obj.checkResult)}</em>
              </span>


        </div>
        <p>
          <span>巡检员:{obj.userName}</span>
          <span>巡检时间:{obj.ckDttm.substring(6,16)}</span>
        </p>
      </li>
    );
    return (
      <div id="mobileDetail" style={{width:"100%",height:"100%",background:"#f0f0f0",paddingTop:"10px"}}>
        <ul className={styles.detailsList}>
          {dataList}
        </ul>
      </div>


    );
  }
}
function mapStateToProps(Evaluation) {
  return Evaluation;
};
export default connect(mapStateToProps)(mobileMaintenance);

