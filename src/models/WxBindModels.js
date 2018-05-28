/**
 * Created by lizhipeng on 2018/1/4.
 */
import { bindWx } from '../services/WxBindService';
import CommonUtil from '../utils/CommonUtil';

export default {
  namespace: 'wxBindModels',
  state: {
    redirect_uri: '',
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    * bindWx({ payload }, { call, put }) {
      const bindResult = yield call(bindWx, payload);
      if (bindResult.code === 0) {
        CommonUtil.AntModal.success('绑定成功！');
      } else {
        CommonUtil.AntModal.error({
          title: '绑定失败',
          content: bindResult.message,
        });
      }
    },
  },
  subscriptions: {},
};
