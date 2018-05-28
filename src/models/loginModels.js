/**
 * Created by zhangfuchuan on 2017/7/17.
 */

import { login, setRoleType, changePw } from '../services/EPatrol';
import CommonUtil from '../utils/CommonUtil';

export default {
  namespace: 'loginModels',
  state: {
    loginData: '',
    newRoleId: '',
  },
  reducers: {
    loginMeth(state, action) {
      return { ...state, ...action.payload };
    },
    setRoleTypeMeth(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield call(login, payload);
    },

    *setRoleType({ payload }, { call, put }) {
      const data = yield call(setRoleType, payload);
      if (data.bizHead.bizRetCode == '1000') {
        CommonUtil.AntModal.success(data.bizHead.bizRetMsg);
      } else {
        CommonUtil.AntModal.error(data.bizHead.bizRetMsg);
      }
    },
    *changePw({ payload }, { call, put }) {
      const data = yield call(changePw, payload);
      if (data.bizHead.bizRetCode === '1000') {
        CommonUtil.AntModal.success(data.bizHead.bizRetMsg);
      } else {
        CommonUtil.AntModal.error(data.bizHead.bizRetMsg);
      }
    },
  },
  subscriptions: {},
};
