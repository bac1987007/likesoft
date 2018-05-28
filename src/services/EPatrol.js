/**
 * Created by zhangfuchuan on 2017/7/17.
 */
import Domain from '../config/Domain';
import Utils from '../utils/Util';

// 登录
export async function login(params) {
  const url = `${Domain.TLH_SERVER_DOMAIN}/login`;
  return Utils.ajaxPostLogin(url, params);
}
// 获取登录信息
export async function getLoginMsg(params) {
  const url = `${Domain.tlhba}/user/v1/cfg4Mobile`;
  return Utils.ajaxGet(url, params);
}

// 获取首页菜单列表
export async function getIndexMenu(params) {
  // let url = 'http://192.168.0.131:8888/menu/select';
  const url = `${Domain.tlhba}/menu/select`;
  return Utils.ajaxGet(url, params);
}

// 获取设备项目详情
export async function getDcitem(params) {
  const url = `${Domain.tlhba}/ework/v1/dcitem/list/${params.deviceId}`;
  return Utils.ajaxGet(url, params);
}
// 删除列表
export async function deleteDcitem(params) {
 // let url = 'http://192.168.0.131:8888/ework/v1/checkLine/delete/'+params.checkItemId+'/'+'-1'; // checkItemId   / status=-1
  const url = `${Domain.tlhba}/ework/v1/checkLine/delete/${params.checkItemId}/-1`;
  return Utils.ajaxGet(url, params);
}

// 新增列表(修改列表)
export async function addDcitem(params) {
  const url = `${Domain.tlhba}/ework/v1/dcitem/save`;
  return Utils.ajaxPost(url, params);
}

// 获取列表详情
export async function getCheckItemInfo(params) {
 // let url = 'http://192.168.0.131:8888/ework/v1/dcitem/detail/'+params.checkItemId ; //checkItemId
  const url = `${Domain.tlhba}/ework/v1/dcitem/detail/${params.checkItemId}`;
  return Utils.ajaxGet(url, params);
}
// 获取考勤人员信息
export async function getCheckWork(params) {
  const url = `${Domain.tlhba}/sign?year=${params.nowYear}&month=${params.nowMonth}`;
  return Utils.ajaxGet(url, params);
}
// 获取考勤人员信息
export async function getCheckWorkLength(params) {
  const url = `${Domain.tlhba}/signcount?year=${params.nowYear}&month=${params.nowMonth}`;
  return Utils.ajaxGet(url, params);
}

// 身份认证
export async function setRoleType(params) {
  const url = `/user/v1/register/roleType?allRoleId=${params.allRoleId}&newRoleId=${params.newRoleId}`;
  return Utils.ajaxPost(url, params);
}

// 修改密码
export async function changePw(params) {
  const url = '/user/v1/register/password';
  return Utils.ajaxPut(url, params);
}

// 获取工单详情
export async function executeGetInfo(params) {
  const url = `${Domain.tlhba}/task/execute/${params.taskId}/getInfo`;
// let url='http://gateway.toplinkhoo.com/ework/v1/task/execute/352966955457576960/getInfo';
  return Utils.ajaxGet(url, params);
}
// 获取执行记录
export async function timelineGetInfo(params) {
  const url = `${Domain.tlhba}/task/timeline/${params.taskId}`;
  // let url='http://gateway.toplinkhoo.com/ework/v1/task/timeline/352501369057312768'
  return Utils.ajaxGet(url, params);
}

// 确认工单信息
export async function tasklog(params) {
  const url = `${Domain.tlhba}/tasklog/${params.taskId}?confirm=${params.confirm}`;
  return Utils.ajaxPutJson(url, params);
}
// 查询设备二维码
export async function getDeviceErcodeSever(params) {
  const url = `${Domain.tlhba}/device/ercodeurl`;
  return Utils.ajaxGet(url, params);
}

// 违规统计
export async function getIllegaObj(params) {
  const url = `${Domain.tlhba}/inspect/count/cq/ALL`;
  return Utils.ajaxGet(url, params);
}
// 违规详情统计
export async function getIllegaObjXq(params) {
  const url = `${Domain.tlhba}/inspect/count/cq/PERSON?cqType=${params.name}`;
  return Utils.ajaxGet(url, params);
}

// 获取样品类型
export async function ypType(params) {
  const url = `${Domain.tlhba}/qi/config/list`;
  return Utils.ajaxGet(url, params);
}
// 获取质检类型
export async function zhiType(params) {
  const url = `${Domain.tlhba}/qi/config/${params.id}`;
  return Utils.ajaxGet(url, params);
}
// 样品新增
export async function qiConfigAdd(params) {
  const url = `${Domain.tlhba}/qi/config`;
  return Utils.ajaxPost(url, params);
}
export async function getyangpin(params) {
  const url = `${Domain.tlhba}/qi/config?qiType=${params.qiType}&specType=${params.specType}`;
  return Utils.ajaxGet(url, params);
}
// 获取质检配置列表
export async function getyangpinConfig(params) {
  // const url = Domain.tlhba +'/qi/config
  // ?specName='+params.specName+'&specBatch='+params.specBatch;
  const url = `${Domain.tlhba}/qi/config`;
  return Utils.ajaxGet(url, params);
}
// 获取yangpin弹窗信息
export async function getyangpinModel(params) {
  const url = `${Domain.tlhba}/qi/config/info/${params.recId}`;
  return Utils.ajaxGet(url, params);
}
// 删除样品
export async function deleteYangpin(params) {
  const url = `${Domain.tlhba}/qi/config/del/${params.recId}`;
  return Utils.ajaxGet(url, params);
}
// jieyang
// 查询质检列表
export async function queryZjList(params) {
  const url = `${Domain.tlhba}/qi/specimen`;
  return Utils.ajaxGet(url, params);
}
// 质检弹窗信息获取
export async function queryTcList(params) {
  const url = `${Domain.tlhba}/qi/specimen/info/${params.specId}`;
  return Utils.ajaxGet(url, params);
}
// 查询质检列表(查询按钮)
export async function queryZjListSerch(params) {
  const url = `${Domain.tlhba}/qi/specimen?specName=${params.specName}&specBatch=${params.specBatch}`;
  return Utils.ajaxGet(url, params);
}
// 批次新增
export async function jieyangAdd(params) {
  const url = `${Domain.tlhba}/qi/specimen`;
  return Utils.ajaxPost(url, params);
}
// 批次删除
export async function deljieyangTab(params) {
  const url = `${Domain.tlhba}/qi/specimen/del/${params.specId}`;
  return Utils.ajaxGet(url, params);
}
// luZhijian
// 录入信息
export async function luZhijain(params) {
  const url = `${Domain.tlhba}/qi/specimen/log`;
  return Utils.ajaxPost(url, params);
}
// 修改录入
export async function luZhijainPut(params) {
  // const url = Domain.tlhba +'/qi/specimen/log';
  const url = `${Domain.tlhba}/qi/log`;
  return Utils.ajaxPost(url, params);
}
// 获取录入列表信息
export async function luZhijianTable(params) {
  const url = `${Domain.tlhba}/qi/log/${params.specId}`;
  return Utils.ajaxGet(url, params);
}
// 删除
export async function deleteZjData(params) {
  const url = `${Domain.tlhba}/qi/log/del/${params.recId}`;
  return Utils.ajaxGet(url, params);
}
// 修改
export async function luZhijianTableModel(params) {
  const url = `${Domain.tlhba}/qi/log/${params.specId}`;
  return Utils.ajaxGet(url, params);
}

// 折线图数据获取  /qi/log/spec/{specType}
export async function getLineDataSel(params) {
  const url = `${Domain.tlhba}/qi/log/spec/${params.specType}`;
  return Utils.ajaxGet(url, params);
}
export async function getLineData(params) {
  const url = `${Domain.tlhba}/qi/log/spec/${params.specType}?startTime=${params.startTime}&endTime=${params.endTime}`;
  return Utils.ajaxGet(url, params);
}
// 折线图数据获取（按质检类型）
export async function getLineTypeData(params) {
  const url = `${Domain.tlhba}/qi/log/config/${params.qiItemName}?startTime=${params.startTime}&endTime=${params.endTime}`;
  return Utils.ajaxGet(url, params);
}
export async function thisdispatchType(params) {
  const url = `${Domain.tlhba}/qi/log/config/${params.qiItemName}`;
  return Utils.ajaxGet(url, params);
}
// 质检项目查询（折线图查询的时候）
export async function qualityPro(params) {
  const url = `${Domain.tlhba}/qi/config/itemname`;
  return Utils.ajaxGet(url, params);
}
// 登出  logoutFun
export async function logoutFun(params) {
  const url = `${Domain.TLH_SERVER_DOMAIN}/logout`;
  return Utils.ajaxPost(url, params);
}
