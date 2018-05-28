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
 * Created by shangxin on 2017/8/2.
 */
import Utils from '../utils/Util';
import Domain from '../config/Domain';

const requestParam = Utils.wxParams();

export async function query(params) {
  const url = `${Domain.tlhba}/task/evaluate?date=${params.newTime}`;
  // const url =" http://gateway.toplinkhoo.com/ework/v1/task/evaluate?date=2017-8-29"
  return Utils.ajaxGet(url, { ...params, ...requestParam });
}
// 查寻维修记录
export async function queryrepair(params) {
  let url;
  if (params.AndroldeviceId) {
    url = `${Domain.tlhba}/devicelog/list/${params.AndroldeviceId}`;
  } else {
    url = `${Domain.tlhba}/devicelog/list/${params.weixiuDeviceId}`;
  }

  // const url = 'http://192.168.0.131:8888/task/history/'+params.bizScene;
  return Utils.ajaxGet(url, { ...params, ...requestParam });
}
// 查寻交班记录
export async function queryWorkOld(params) {
  const url = `${Domain.tlhba}/inspect/turnDuty`;
  // const url ='http://192.168.0.131:8888/task/execute/'+params.taskId+"/getInfo";
  return Utils.ajaxGet(url, { ...params, ...requestParam });
}
// 查寻交班记录===>手机
export async function mobeilqueryWorkOld(params) {
  const url = `${Domain.tlhba}/inspect/turnDuty2`;
  // const url ='http://192.168.0.131:8888/task/execute/'+params.taskId+"/getInfo";
  return Utils.ajaxGet(url, { ...params, ...requestParam });
}
