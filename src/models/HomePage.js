/**
 * Created by baiancheng on 2018/4/18
 */
import {
  getFailureRate, getIllegaObj, getInspectInfo, getInspectPlace, getRepair, getRepairList,
  getRepairModelInfo
} from "../services/HomePage";
import Utils from "../utils/Util";

export default {
  namespace: 'HomePage',
  state: {
    Per:[],//设备完好率百分比
    ldData:[],//巡检的场地和时间
    InspectInfo:[],//巡检信息
    transInfo:"",//设备完好率
    modelInfo:[],
    RepairList:[],
    Repair:[],
    modelName:"",
    Failure:[],
  },
  reducers: {
    getInspectPlaceTimeMeth(state, action){
      return { ...state, ...action.payload };
    },
    getInspectInfoMeth(state, action){
      return { ...state, ...action.payload };
    },
    getTransInfoMeth(state, action){
      return { ...state, ...action.payload };
    },
    getRepairTitleMeth(state, action){
      return { ...state, ...action.payload };
    },
    getRepairModelMeth(state, action){
      return { ...state, ...action.payload };
    },
    getRepairListMeth(state, action){
      return { ...state, ...action.payload };
    },
    getRepairMeth(state, action){
      return { ...state, ...action.payload };
    },
    getFailureRateMeth(state, action){
      return { ...state, ...action.payload };
    },
    getRepairPerMeth(state, action){
      return { ...state, ...action.payload };
    },
  },
  effects: {
    //查询巡检场地
    *getInspectPlaceTime({payload}, {call, put}){
      let data = yield call(getInspectPlace, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const ldData = data.bizInfo;
        let k = 0;
        if(ldData[0].times.length==0) k=1;
        else if(ldData[1].times.length==0) k=2;
        else if(ldData[2].times.length==0) k=3;
        yield put({type: 'getInspectPlaceTimeMeth',payload: {ldData}});
        let info = yield call(getInspectInfo, {"checkTime":ldData[k].times[k],"deptId":ldData[k].key});
        if (info.bizHead.bizRetCode == '1000') {
          const InspectInfo = info.bizInfo;
          yield put({type: 'getInspectInfoMeth',payload: {InspectInfo}});
        }
      }
    },
    *getInspectData({payload}, {call, put}){
      let info = yield call(getInspectInfo, payload);
      if (info.bizHead.bizRetCode == '1000') {
        const InspectInfo = info.bizInfo;
        yield put({type: 'getInspectInfoMeth',payload: {InspectInfo}});
      }
    },
    //故障占比率
    *getFailureRate({payload}, {call, put}){
      let data = yield call(getFailureRate, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const Failure = data.bizInfo;
        const Per = parseInt(data.transInfo);
        yield put({type: 'getFailureRateMeth',payload: {Failure},});
        yield put({type: 'getRepairPerMeth',payload: {Per}});
      }
    },
    // 查询维修状态
    *getRepair({payload}, {call, put}){
      let data = yield call(getRepair, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const Repair = data.bizInfo;
        const TransInfo = data.bizInfo;
        yield put({type: 'getTransInfoMeth',payload: {TransInfo}});
        yield put({type: 'getRepairMeth',payload: {Repair}});
      }
    },
    //查询故障列表
    *getRepairList({payload}, {call, put}){
      let data = yield call(getRepairList, payload);
      if (data.bizHead.bizRetCode == '1000'&& data.bizHead.bizRetMsg != '没有相关数据') {
        const RepairList = data.bizInfo;
        const modelName = data.bizInfo[0].nameModel;
        yield put({type: 'getRepairListMeth',payload: {RepairList}});
        yield put({type: 'getRepairTitleMeth',payload: {modelName}});
        let RepairModel = yield call(getRepairModelInfo, RepairList[0]);
        if (RepairModel.bizHead.bizRetCode == '1000') {
          const modelInfo = RepairModel.bizInfo;
          yield put({type: 'getRepairModelMeth',payload: {modelInfo}});
        }
      }
    },
    *getRepairInfo({payload}, {call, put}){
      let data = yield call(getRepairModelInfo, payload);
      const modelName = payload.nameModel
      yield put({type: 'getRepairTitleMeth',payload: {modelName}});
      if (data.bizHead.bizRetCode == '1000') {
        const modelInfo = data.bizInfo;
        yield put({type: 'getRepairModelMeth',payload: {modelInfo}});
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('HOMEPAGE')) {
          dispatch({type:'getInspectPlaceTime',payload:{}});
          dispatch({type:'getFailureRate',payload:{startTime:Utils.getNowFormatDate(),endTime:Utils.getNowFormatDate()}});
          dispatch({type:'getRepair',payload:{startTime:Utils.getNowFormatDate(),endTime:Utils.getNowFormatDate()}});
          dispatch({type:'getRepairList',payload:{startTime:Utils.getNowFormatDate(),endTime:Utils.getNowFormatDate()}});
          // dispatch({type:'getFailureRate',payload:{}});
        }
      });
    },
  },
};
