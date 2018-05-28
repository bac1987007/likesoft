import Domain from '../config/Domain';
import Utils from '../utils/Util';

// 查询巡检场地和时间
export async function getInspectPlace(params) {
  const url = `${Domain.tlhba}/ework/v1/ckline/orgdept/${Utils.getNowFormatDate()}/times`;
  return Utils.ajaxGet(url, params);
}
// 根据巡检时间和ID查询巡检数据
export async function getInspectInfo(params) {
  const url = `${Domain.tlhba}/ework/v1/ckLine/inspect2/${Utils.getNowFormatDate()}/${params.checkTime}/${params.deptId}`;
  return Utils.ajaxGet(url, params);
}
// 查询故障占比率
export async function getFailureRate(params) {
  const url = `${Domain.tlhba}/repair/type?startTime=${params.startTime}&endTime=${params.endTime}`;
  return Utils.ajaxGet(url, params);
}
// 查询维修状态
export async function getRepair(params) {
  const url = `${Domain.tlhba}/repair/status?startTime=${params.startTime}&endTime=${params.endTime}`;
  return Utils.ajaxGet(url, params);
}
// 查询故障列表
export async function getRepairList(params) {
  const url = `${Domain.tlhba}/repair/top/web?startTime=${params.startTime}&endTime=${params.endTime}`;
  return Utils.ajaxGet(url, params);
}

// 查询某部件故障列表
export async function getRepairModelInfo(params) {
  const url = `${Domain.tlhba}/devicelog/list/${params.deviceId}`;
  return Utils.ajaxGet(url, params);
}

