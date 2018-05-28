/**
 * Created by lizhipeng on 2017/7/19.
 */
import Utils from '../../utils/Util';
import Domain from '../../config/Domain';

// 获取服务部门列表
export async function initCheckLineDepts(params) {
  const url = `${Domain.tlhba}/dept/${params.orgId}`;
  // const url = `${Domain.GateWay}/dept/${params.orgId}`;
  return Utils.ajaxs(url, {}, 'GET');
}

// 获取线路列表
export async function initCheckLineList(params) {
  const url = `${Domain.tlhba}/ework/v1/ckLine/list`;
  return Utils.ajaxs(url, params, 'GET');
}

// 删除线路
export async function deleteCheckLine(params) {
  const url = `${Domain.tlhba}/ework/v1/ckLine/delete/${params.checkLineId}`;
  return Utils.ajaxs(url, { lineStatus: '-1' }, 'GET');
}

// 获取岗位列表
export async function initCheckLineRoles(params) {
  const url = `${Domain.tlhba}/role/${params.orgId}`;
  return Utils.ajaxs(url, {}, 'GET');
}

// 保存线路信息
export async function saveCheckLine(params) {
  const url = `${Domain.tlhba}/ework/v1/checklineday/save`;
  return Utils.ajax(url, params);
}

// 线路详细信息
export async function detailCheckLine(params) {
  const url = `${Domain.tlhba}/ework/v1/ckLine/detail/${params.checkLineId}`;
  const result = Utils.ajaxs(url, {}, 'GET');
  return result;
}

// 根据设备编码查询巡检项目列表
export async function queryDcLineItems(params) {
  const url = `${Domain.tlhba}/ework/v1/ckItem/${params.deviceCode}`;
  const result = Utils.ajaxs(url, {}, 'GET');
  return result;
}
