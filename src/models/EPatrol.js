/**
 * Created by zhangfuchuan on 2017/7/17.
 * // .--,       .--,
 //  ( (  \.---./  ) )
 //   '.__/o   o\__.'
 //      {=  ^  =}
 //       >  -  <
 //      /       \
 //     //       \\
 //    "'\       /'"_.-~^`'-.
 //       \  _  /--'         `
 //     ___)( )(___
 //    (((__) (__)))    高山仰止,景行行止.虽不能至,心向往之。
 */

import {
  addDcitem,
  getDcitem,
  deleteDcitem,
  getCheckItemInfo,
  getIndexMenu,
  getCheckWork,
  getCheckWorkLength,
  executeGetInfo,
  timelineGetInfo,
  tasklog,
  getDeviceErcodeSever,
  getIllegaObj,
  getIllegaObjXq,
  ypType,
  zhiType,
  qiConfigAdd,
  getyangpin,
  deleteYangpin,
  queryZjList,
  jieyangAdd,
  deljieyangTab,
  luZhijianTable,
  luZhijain,
  deleteZjData,
  luZhijianTableModel,
  luZhijainPut,
  getyangpinConfig,
  queryZjListSerch,
  getLineData,
  getLoginMsg,
  getLineTypeData,
  getLineDataSel,
  qualityPro,
  thisdispatchType,
  getyangpinModel,
  logoutFun,
  queryTcList,
  getFailureRate,
  getRepair,
  getRepairList,
  getRepairModelInfo,
  getInspectPlace,
  getInspectInfo,
} from '../services/EPatrol';
import CommonUtil from '../utils/CommonUtil';
import Utils from '../utils/Util';

export default {
  namespace: 'EPatrol',
  state: {
    loading: false,
    LoginMsg:{},
    menuList:[],
    orgId:"",
    deviceCode:"",
    deviceId:"",
    nameModel:"",
    ckMethod:"",
    dataSourcetype:"",
    epDataList:[],
    //巡检项目中的弹出层信息
    deviceInfo:{},
    //考勤数据
    checkWorkData:[],
    signCount:"",
    unUualifiedTimes:"",
    workTime:"",
    nowYear:"",
    nowMonth:"",
    previousMouth:"",
    //工单详情
    taskId:"",
    executeInfo:{},
    execOpinionCn:"",
    //执行记录
    timelineInfo:[],
    //工单确认
    confirm:{},
    //打印设备二维码data
    deviceErcode :[],
    //打印页选中的选项url
    checkedValues :[],
    //违规统计
    Illegal :[],
    IllegalXq:[],
    name:{},

    yangpinInfo:{},  //yangpin(弹窗的信息)
    ypTypeList:[],  //获取样品类型
    zhiTypeList:[],  //获取质检类型
    yangpinTable:[], //样品列表表格

    queryZjListData:[],  //质检列表
    specName:'',
    specBatch:'',
    jieyangInfo:{},  //jieyang(弹窗信息)

    luZjTable:[], //录入质检table存储的数组
    zhijianInfo:{},
    zhijianSpecId:'', //存储从接样带过SpecId
    zhijianSpecBatch:'', // 样品编码
    zhijianSpecName:'', // 样品名称
    zhijianSpecType:'', // 样品类型
    zhijianCollectDttm:'', //样品采集时间
    qiUser:'', //质检人员
    selZhiTabData:[], //根据质检类型查询出来的数据表格
    zhiPutInfo:{},   //录入修改时

    LineData:{},  // 折线图统计 按样品
    LineTypeData:{}, // 折线图统计 按类型
    TimeChangeS0:'',  //采集时间
    TimeChangeS1:'',  //按样品开始时间
    TimeChangeS2:'',  //按样品结束时间
    TimeChangeS3:'',  //按类型开始时间
    TimeChangeS4:'',  //按类型结束时间
    qualityProList:[],  //质检类型（视图查询的获取）
  },
  reducers: {
    getDcitemMeth(state, action) {
      return { ...state, ...action.payload };
    },
    executeGetInfoMeth(state, action) {
      return { ...state, ...action.payload };
    },
    addDcitemMeth(state, action) {
      return { ...state, ...action.payload };
    },
    deleteDcitemMeth(state, action) {
      return { ...state, ...action.payload };
    },
    getCheckItemInfoMeth(state, action){
      return { ...state, ...action.payload };
    },
    refreshDeviceId(state, action){
      return { ...state, ...action.payload };
    },
    getIndexMenuMeth(state, action){
      return { ...state, ...action.payload };
    },
    getCheckWorkMeth(state, action){
      return { ...state, ...action.payload };
    },
    getCheckWorkLengthMeth(state, action){
      return { ...state, ...action.payload };
    },
    getCollectionTable(state, action){
      return { ...state, ...action.payload };
    },
    timelineGetInfoMeth(state, action){
      return { ...state, ...action.payload };
    },
    getDeviceErcodeMeth(state, action){
      return { ...state, ...action.payload };
    },
    updataErcodeMeth(state, action){
      return { ...state, ...action.payload };
    },
    getIllegaObjMeth(state, action){
      return { ...state, ...action.payload };
    },
    ypTypeMeth(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    //获取首页菜单列表
    *getIndexMenu({payload},{call , put}){
      yield put({ type: 'showLoading' });
      const data = yield call(getIndexMenu, payload);
      yield put({ type: 'hideLsoading'});
      if (data.bizHead.bizRetCode == '1000') {
        const menuList = data.bizInfo;
        yield put({
          type: 'getIndexMenuMeth',
          payload: {menuList},
        });
      }
    },
    //获取列表信息
    *getDcitem({ payload }, { call, put }) {
      yield put({ type: 'refreshDeviceId', payload});
      const data = yield call(getDcitem, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const deviceCon = {loading:false,
          orgId:data.bizInfo.orgId,  //设备ID
          deviceId:data.bizInfo.deviceId,
          deviceCode: data.bizInfo.deviceCode, //设备编码
          nameModel:data.bizInfo.nameModel, //设备名称
          epDataList: data.bizInfo.itemList, //列表内容
        };   //获取列表内容
        yield put({
          type: 'getDcitemMeth',
          payload: deviceCon,
        });
      }
    },
    //获取登录信息
    *getLoginMsg({ payload }, { call, put }){
      const data = yield call(getLoginMsg, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{LoginMsg:data.bizInfo} });
      }
    },

    // 新增列表信息
    *addDcitem({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const data = yield call(addDcitem, payload);
      yield put({ type: 'hideLoading'});
      if (data.bizHead.bizRetCode == '1000') {
        //刷新获取列表
        let data = yield call(getDcitem, payload);
        if (data.bizHead.bizRetCode == '1000') {
          let deviceInfo = {loading:false,
            orgId:data.bizInfo.orgId,  //设备ID
            deviceId:data.bizInfo.deviceId,
            deviceCode: data.bizInfo.deviceCode, //设备编码
            nameModel:data.bizInfo.nameModel, //设备名称
            epDataList: data.bizInfo.itemList, //列表内容
          };   //获取列表内容
          yield put({
            type: 'getDcitemMeth',
            payload: deviceInfo,
          });
        }
        CommonUtil.AntModal.success(data.bizHead.bizRetMsg);
      }
    },
    //获取列表详情信息
    *getCheckItemInfo({ payload }, { call, put }) {
      const data = yield call(getCheckItemInfo, payload);
      //成功之后执行
      if (data.bizHead.bizRetCode == '1000') {
        const deviceInfo = data.bizInfo ;
        yield put({
          type: 'getCheckItemInfoMeth',     //指向model里面的方法
          payload: { deviceInfo },
        });
      }
    },
    // 删除列表信息
    *deleteDcitem({ payload }, { call, put }) {
      yield put({ type: 'showLoading',payload });
      const data = yield call(deleteDcitem, payload);
      yield put({ type: 'hideLoading'});
      if (data.bizHead.bizRetCode == '1000') {
       const deviceId = localStorage.getItem("deviceId");
        yield put({
          type: 'getDcitem',
          payload: {
            deviceId:deviceId,
          },
        });
        CommonUtil.AntModal.success(data.bizHead.bizRetMsg);
      }
    },
    //获取考勤次数及未巡检次数
    *getCheckWorkLength({payload}, {call, put}) {
      const data = yield call(getCheckWorkLength, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const WorkLength = data.bizInfo;
        yield put({
          type: 'getCheckWorkLengthMeth',
          payload: WorkLength,
        });
      }
    },

    //获取考勤信息
    *getCheckWorkInfo({payload}, {call, put}) {
     const data = yield call(getCheckWork, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const checkWorkData = data.bizInfo.list;
        yield put({
          type: 'getCheckWorkMeth',
          payload: {checkWorkData},
        });
      }
    },
    //获取工单详情
    *executeGetInfo({payload}, {call, put}){
      let data = yield call(executeGetInfo, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const executeInfo = data.bizInfo;
        yield put({
          type: 'getCheckWorkMeth',
          payload: {executeInfo},
        });
      }
    },
    //获取执行记录
    *timelineGetInfo({payload}, {call, put}){
      let data = yield call(timelineGetInfo, payload);
      if (data.bizHead.bizRetCode == '1000' && data.bizInfo!= null ) {
        const timelineInfo = data.bizInfo;
        yield put({
          type: 'timelineGetInfoMeth',
          payload: {timelineInfo},
        });
      }
    },
    //工单确认
    *tasklog({payload}, {call, put}){
      let data = yield call(tasklog, payload);
      if (data.bizHead.bizRetCode == '1000') {
        CommonUtil.AntModal.success(data.bizHead.bizRetMsg);
      }
    },
    //设备查询，打印二维码
    *getDeviceER({payload}, {call, put}){
      let data = yield call(getDeviceErcodeSever, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const deviceErcode = data.bizInfo;
        yield put({
          type: 'getDeviceErcodeMeth',
          payload: {deviceErcode },
        });
      }
    },

    //违规统计
    *getIllegaObj({payload}, {call, put}){
      let data = yield call(getIllegaObj, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const Illegal = data.bizInfo;
        yield put({
          type: 'getIllegaObjMeth',
          payload: {Illegal },
        });
      }
    },
    //违规统计详情
    *getIllegaObjXq({payload}, {call, put}){
      let data = yield call(getIllegaObjXq, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const IllegalXq = data.bizInfo;
        yield put({
          type: 'getIllegaObjMeth',
          payload: {IllegalXq },
        });
      }
    },
    //获取菜单
    *getMenuList({payload}, {call, put}) {
      let resp = yield call(getMenuList, parse(payload));
      if (resp && resp.code === '1000' && resp.data) {
        yield put({
          type   : 'operateSuccess',
          payload: {
            menuList: resp.data,
          },
        });
      }
    },
    //获取登录信息
    *getLoginInfo({payload}, {call, put}) {
      let resp = yield call(getLoginInfo, parse(payload));
      if (resp && resp.code === '1000' && resp.data) {
        yield put({
          type   : 'operateSuccess',
          payload: {
            loginInfo: resp.data,
          },
        });
      }
    },
    //获取样品类型
    *ypType({ payload }, { call, put }){
      const data = yield call(ypType, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{ypTypeList:data.bizInfo} });
      }
    },
    //获取质检类型
    *zhiType({ payload }, { call, put }){
      const data = yield call(zhiType, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{zhiTypeList:data.bizInfo} });
      }
    },
    //样品新增
    *qiConfigAdd({ payload }, { call, put }){
      const data = yield call(qiConfigAdd, payload);
      if (data.bizHead.bizRetCode === '1000') {
        let data = yield call(getyangpinConfig, payload);
        yield put({ type: 'ypTypeMeth', payload:{yangpinTable:data.bizInfo} });
      }
    },
    //查询样品列表
    *getyangpin({ payload }, { call, put }){
      const data = yield call(getyangpin, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{yangpinTable:data.bizInfo} });
      }
    },
    //获取样品列表
    *getyangpinConfig({ payload }, { call, put }){
      const data = yield call(getyangpinConfig, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{yangpinTable:data.bizInfo} });
      }
    },
    //删除样品列表
    *deleYangpin({ payload }, { call, put }){
      const data = yield call(deleteYangpin, payload);
      if (data.bizHead.bizRetCode === '1000') {
        let data = yield call(getyangpinConfig, payload);
        yield put({ type: 'ypTypeMeth', payload:{yangpinTable:data.bizInfo} });
      }
    },
    //查询样品弹窗信息
    *getyangpinModel({ payload }, { call, put }){
      const data = yield call(getyangpinModel,payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{yangpinInfo:data.bizInfo} });
      }
    },
    //jieyang
    //查询质检列表
    *queryZjList({ payload }, { call, put }){
      const data = yield call(queryZjList, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{queryZjListData:data.bizInfo} });
      }
    },
    *queryZjListSerch({ payload }, { call, put }){
      const data = yield call(queryZjListSerch, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{queryZjListData:data.bizInfo} });
      }
    },
    //查询质检列表弹窗
    *queryZjListModel({ payload }, { call, put }){
      const data = yield call(queryTcList, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{jieyangInfo:data.bizInfo}});
      }
    },
    //批次新增
    *jieyangAdd({ payload }, { call, put }){
      const data = yield call(jieyangAdd, payload);
      if (data.bizHead.bizRetCode === '1000') {
        let data = yield call(queryZjList, payload);
        yield put({ type: 'ypTypeMeth', payload:{queryZjListData:data.bizInfo} });
      }
    },
    //删除批次列表
    *deljieyangTab({ payload }, { call, put }){
      const data = yield call(deljieyangTab, payload);
      if (data.bizHead.bizRetCode === '1000') {
        let data = yield call(queryZjList, payload);
        yield put({ type: 'ypTypeMeth', payload:{queryZjListData:data.bizInfo} });
      }
    },
  //zhijian（录入）
   // 录入信息
    *luZhijain({ payload }, { call, put }){
      const data = yield call(luZhijain, payload);
      if (data.bizHead.bizRetCode === '1000') {
        let data = yield call(luZhijianTable, payload);
        yield put({ type: 'ypTypeMeth', payload:{luZjTable:data.bizInfo} });
      }
    },
  //获取录入列表信息
    *luZhijianTable({ payload }, { call, put }){
      const data = yield call(luZhijianTable, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{luZjTable:data.bizInfo} });
      }
    },
    //获取录入修改弹窗信息
    *luZhijianTableModel({ payload }, { call, put }){
      const data = yield call(luZhijianTableModel, payload);
      if (data.bizHead.bizRetCode === '1000') {
        let i = payload.index;
        yield put({ type: 'ypTypeMeth', payload:{zhiPutInfo:data.bizInfo[i]} });
      }
    },
    //删除一条table
    *deleteZjData({ payload }, { call, put }){
      const data = yield call(deleteZjData, payload);
      if (data.bizHead.bizRetCode === '1000') {
        let data = yield call(luZhijianTable, payload);
        yield put({ type: 'ypTypeMeth', payload:{luZjTable:data.bizInfo} });
      }
    },
    //put 修改 luZhijainPut
    *luZhijainPut({ payload }, { call, put }){
      const data = yield call(luZhijainPut, payload);
      if (data.bizHead.bizRetCode === '1000') {
        let data = yield call(luZhijianTable, payload);
        yield put({ type: 'ypTypeMeth', payload:{luZjTable:data.bizInfo} });
      }
    },

    *getLineDataSel({payload}, {call, put}){
      let data = yield call(getLineDataSel, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const LineData = data.bizInfo;
        yield put({
          type: 'getIllegaObjMeth',
          payload: {LineData },
        });
      }
    },
    //折线图数据获取 (按照样品)
    *getLineData({payload}, {call, put}){
      let data = yield call(getLineData, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const LineData = data.bizInfo;
        yield put({
          type: 'getIllegaObjMeth',
          payload: {LineData },
        });
      }
    },
    //按照质检类型
    *getLineTypeData({payload}, {call, put}){
      let data = yield call(getLineTypeData, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const LineTypeData = data.bizInfo;
        yield put({
          type: 'getIllegaObjMeth',
          payload: {LineTypeData },
        });
      }
    },
    //thisdispatchType
    *thisdispatchType({payload}, {call, put}){
      let data = yield call(thisdispatchType, payload);
      if (data.bizHead.bizRetCode == '1000') {
        const LineTypeData = data.bizInfo;
        yield put({
          type: 'getIllegaObjMeth',
          payload: {LineTypeData },
        });
      }
    },
    //质检项目查询（折线图查询的时候）
    *qualityPro ({ payload }, { call, put }){
      const data = yield call(qualityPro, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'ypTypeMeth', payload:{qualityProList:data.bizInfo} });
      }
    },
    //登出  logoutFun
    *logoutFun ({ payload }, { call, put }){
      const data = yield call(logoutFun, payload);
      if (data.bizHead.bizRetCode === '1000') {
        location.reload();
      }
    },
  },
  subscriptions: {

  },
};


