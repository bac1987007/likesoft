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
import {query} from '../services/Evaluation';//编辑
import {queryrepair} from '../services/Evaluation';//维修记录
import {queryWorkOld} from '../services/Evaluation';//交班记录
import {mobeilqueryWorkOld} from '../services/Evaluation';//交班记录==>mobeil
export default {
  namespace: 'Evaluation',
  state: {
    dataList:[

    ],
    transInfo:"",
    issueRate:[
    ],
    repairList:[],
    WorkOrder:[],
    oldWorkList:[],
    mobeiloldWorkList:[],
  },
  reducers: {
    updata(state, action) {
      return { ...state, ...action.payload };
    },
    updatarepair(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    //查询接口
    *query({payload}, {call, put}) {
      const data = yield call(query, payload);
      const payloads = { dataList: data.bizInfo.deviceAnalyze,transInfo:data.transInfo,issueRate:data.bizInfo.issueRate};
      yield put({type: 'updata', payload: payloads});

    },
    //获取维修记录
    *queryrepair({payload}, {call, put}) {
      const data = yield call(queryrepair, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({type: 'updatarepair', payload:{repairList:data.bizInfo}});
      }else if(data.bizHead.bizRetCode === '1001'){
        yield put({type: 'updatarepair', payload:{repairList:""}});
      }
    },
    //获取交班记录
    *queryWorkOld({payload}, {call, put}) {
      const data = yield call(queryWorkOld, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({type: 'updatarepair', payload:{oldWorkList:data.bizInfo}});
      }else if(data.bizHead.bizRetCode === '1001'){
        yield put({type: 'updatarepair', payload:{oldWorkList:""}});
      }
    },
    *mobeilqueryWorkOld({payload}, {call, put}) {
      const data = yield call(mobeilqueryWorkOld, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({type: 'updatarepair', payload:{mobeiloldWorkList:data.bizInfo}});
      }else if(data.bizHead.bizRetCode === '1001'){
        yield put({type: 'updatarepair', payload:{mobeiloldWorkList:""}});
      }
    },
  },
  subscriptions: {},
};
