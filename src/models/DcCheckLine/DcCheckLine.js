/**
 * Created by lizhipeng on 2017/7/19.
 */
import {
  initCheckLineDepts,
  initCheckLineList,
  initCheckLineRoles,
  saveCheckLine,
  detailCheckLine,
  queryDcLineItems,
  deleteCheckLine }
  from '../../services/DcCheckLine/DcCheckLine';
import CommonUtil from '../../utils/CommonUtil';

export default {
  namespace: 'DcCheckLine',
  state: {
    checkLineDepts: [],
    checkLineList: [],
    checkLineRoles: [],
    checkLinePeriodKeys: ['N', 'D', 'H', 'W', 'M', 'Y'],
    checkLinePeriod: { N: '只执行一次', D: '每天', H: '每小时', W: '每周', M: '每月', Y: '每年' },
    checkLineHitSet: ['5m', '15m', '30m', '1h', '2h', '1d', '2d', '1w'],
    ckLineItems: [], // 已选择选中Items
    ckLineItemIds: [],
    showLoading: false,
    dcLineModalShowLoading: false,
    dcItemModalShowLoading: false,
  },
  reducers: {
    update(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 初始化部门信息
    *queryCheckNames({ payload }, { call, put }) {
      yield put({ type: 'update', payload: { showLoading: true } });
      const data = yield call(initCheckLineDepts, payload);
      yield put({ type: 'update', payload: { showLoading: false } });
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'update', payload: { checkLineDepts: data.bizInfo } });
      }
      // 连带查询岗位列表
      yield put({ type: 'queryInitCheckLineRoles', payload });
    },
    // 获取线路列表
    *queryInitCheckLineList({ payload }, { call, put }) {
      yield put({ type: 'update', payload: { showLoading: true } });
      const data = yield call(initCheckLineList, payload);
      yield put({ type: 'update', payload: { showLoading: false } });
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'update', payload: { checkLineList: data.bizInfo } });
       }else if(data.bizHead.bizRetCode === '1001'){

        yield put({ type: 'update', payload: { checkLineList: [] }});
      }

    },
    // 初始化岗位信息
    *queryInitCheckLineRoles({ payload }, { call, put }) {
      const data = yield call(initCheckLineRoles, payload);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'update', payload: { checkLineRoles: data.bizInfo } });
      }
    },
    // 删除线路信息
    *deleteCheckLine({ payload }, { call, put }) {
      yield put({ type: 'update', payload: { showLoading: true } });
      const data = yield call(deleteCheckLine, payload.record);
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'queryInitCheckLineList', payload: { deptId: payload.record.deptId } });
        CommonUtil.AntModal.success(data.bizHead.bizRetMsg);
      } else {
        yield put({ type: 'update', payload: { showLoading: false } });
       // CommonUtil.AntModal.error(data.bizHead.bizRetMsg);
      }
    },
    // 保存线路详细信息
    *saveCheckLine({ payload }, { call, put }) {
      yield put({ type: 'update', payload: { dcLineModalShowLoading: true } });
      const data = yield call(saveCheckLine, payload);
      yield put({ type: 'update', payload: { dcLineModalShowLoading: false } });
      if (data.bizHead.bizRetCode === '1000') {
        yield put({ type: 'queryInitCheckLineList', payload: { deptId: payload.deptId } });
        CommonUtil.AntModal.success(data.bizHead.bizRetMsg);
      }
    },
    // 获取线路详细信息
    *detailCheckLine({ payload }, { call, put }) {
      yield put({ type: 'update', payload: { showLoading: true } });
      const editRecord = yield call(detailCheckLine, payload.record);
      yield put({ type: 'update', payload: { showLoading: false } });
      if (editRecord.bizHead && editRecord.bizHead.bizRetCode === '1000') {
        const items = editRecord.bizInfo.cklineItems;
        const itemIds = [];
        items.map((data) => {
          return itemIds.push(data.checkItemId);
        });
        yield put({ type: 'update', payload: { ckLineItems: items, ckLineItemIds: itemIds } });
        payload.self.setState({
          editModal: true,
          record: editRecord.bizInfo,
        });
      } else {
        yield put({ type: 'update', payload: { ckLineItems: [] } });
       // CommonUtil.AntModal.error(editRecord.bizHead.bizRetMsg);
      }
    },
    *queryItemList({ payload }, { call, put }) {
      yield put({ type: 'update', payload: { dcItemModalShowLoading: true } });
      const item = yield call(queryDcLineItems, payload);
      yield put({ type: 'update', payload: { dcItemModalShowLoading: false } });
      if (item.bizHead && item.bizHead.bizRetCode === '1000') {
        const self = payload.self;
        self.setState({
          ckSearchItemList: item.bizInfo,
        });
      }
    },
  },
  subscriptions: {},
};
