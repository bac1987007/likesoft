/**
 * Created by lizhipeng on 2018/1/4.
 */
import Utils from '../utils/Util';
import Domain from '../config/Domain';

/**
 * 微信帐号绑定
 * @param params
 * @return {Promise.<*>}
 */
export async function bindWx(params) {
  const url = `${Domain.TLH_SERVER_DOMAIN}/api/wx/pecker/binding`;
  return Utils.ajaxs(url, params, 'POST');
}
