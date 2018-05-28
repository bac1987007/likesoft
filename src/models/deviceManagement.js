/**
 * Created by shangxin on 2017/6/29.
 */


import {formEditInfo} from '../services/deviceManagement';//编辑
import {removeFormList} from '../services/deviceManagement';
import {department} from '../services/deviceManagement';
import {query} from '../services/deviceManagement';
import {creatForm} from '../services/deviceManagement';
import {searchPeople} from '../services/deviceManagement';//获取指定管理员
import {patrolPost} from '../services/deviceManagement';//获取巡检岗位
import {queryZjList,jieyangAdd,deljieyangTab,ypType,zhiType} from '../services/deviceManagement';  //查询质检列表
import CommonUtil from '../utils/CommonUtil';
export default {
  namespace: 'deviceManagement',
  state: {
   inputValue:'',
    dataList:[
      {
        deviceCode:"",
        nameModel:"",
        position:"",
        deptId:""
      }
    ],
    pageSize:4,
    total:30,
    current: 1,
    loadding: false,
    deviceCode:'',
    deptId:"",
    deviceId:"",
    editDevice:'',
    dept:[],           //获取的所有部门
    departmentSearch:"",   //点击搜索时的下拉框值
    searchPeople:"",      //新增部门选择后，向后台请求制定管理员
    patrolPost:[],        //巡检岗位
    dcType:"",         // 选中的类别
    defaultdcType:"",     //
    queryZjListData:[],  //质检列表
    specName:'',
    specBatch:'',
    ypTypeList:[],  //获取样品类型
    zhiTypeList:[],  //获取质检类型
  },
  reducers: {
    freshen(state, action) {
      return { ...state, ...action.payload };
    },
    reset(state, action) {
      return { ...state, ...action.payload };
    },
    upload(state, action) {
      return { ...state, ...action.payload };
    },
    upForm(state, action) {
      return { ...state, ...action.payload };
    },
    //编辑
    editForm(state, action) {
      return { ...state, ...action.payload };
    },
    departmentMeth(state, action) {
      return { ...state, ...action.payload };
    },
    ypTypeMeth(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    //查询接口
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      const payloads = {loading:false, dataList: data.bizInfo,total:Number(data.transInfo)*10,};
      yield put({type: 'freshen', payload:payloads });
    },
    //新增表单
    *creatForm({ payload }, { call, put }){
      const data = yield call(creatForm, payload);
      // yield put({ type: 'freshen' , payload:{loading:false}});
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'query', payload:{  pageNum:"10",
          currentPage:"1",} });
        CommonUtil.AntModal.success('设备录入成功');
      }
    },
    //删除一行
    *removeFormList({ payload }, { call, put }){
      const data = yield call(removeFormList, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'query', payload:{  pageNum:"10",
          currentPage:"1",} });
        CommonUtil.AntModal.success('删除成功');
      }
    },
    //jieyang批次删除一行
    *deljieyangTab({ payload }, { call, put }){
      const data = yield call(deljieyangTab, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'query', payload:{  pageNum:"10",
          currentPage:"1",} });
        CommonUtil.AntModal.success('删除成功');
      }
    },
    //编辑
    *formEditInfo({ payload }, { call, put }){
      const data = yield call(formEditInfo, payload);
     // console.log(data);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'editForm', payload:{editDevice:data.bizInfo} });
        const self = payload.self;
        self.thisdispatch(data.bizInfo.deptId);
      }
    },
    //后台获取部门
    *department({ payload }, { call, put }){
      const data = yield call(department, payload);
      //更新model部门
      if (data.bizHead.bizRetCode === '1000') {
         console.log(data.bizInfo);
        yield put({ type: 'departmentMeth', payload:{dept:data.bizInfo} });
      }
    },
    //获取指定管理员
    *searchPeople({ payload }, { call, put }){
      const data = yield call(searchPeople, payload);
      //更新model部门
      const self = payload.self;
      if (data.bizHead.bizRetCode === '1000') {
        self.setState({
          searchPeople:data.bizInfo,
        });
      }
    },
    //获取巡检岗位
    *patrolPost({ payload }, { call, put }){
      const data = yield call(patrolPost, payload);
      console.log(data);
      //更新model部门
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'upload', payload:{patrolPost:data.bizInfo} });
      }
    },

  },
  subscriptions: {},
};
