
import Utils from '../utils/Util';
import Domain from '../config/Domain';

export async function query(params) {
    // const url = 'http://192.168.0.131:8888/device/NJBH';
  const url = `${Domain.tlhba}/device/WNQ`;
  return Utils.ajaxGet(url, params);
}
export async function creatForm(params) {
  // const url = 'http://192.168.0.131:8888/device/save';
  const url = `${Domain.tlhba}/device/save`;
  return Utils.ajaxPost(url, params);
}
// 获取部门----->跨域先改成jsonp后期改get
export async function department(params) {
  console.log(params);
  // const url = 'http://192.168.0.131:8888/dept/NJBH';
  const url = `${Domain.tlhba}/dept/WNQ`;
  return Utils.ajaxGet(url, params);
}
// 删除一行
export async function removeFormList(params) {
  // const url = 'http://192.168.0.131:8888/device/delete/'+params.id;
  const url = `${Domain.tlhba}/device/delete/${params.id}`;
  return Utils.ajaxGet(url, params);
}
// 编辑edit
export async function formEditInfo(params) {
  // const url = 'http://192.168.0.131:8888/device/detail/'+params.id;
  const url = `${Domain.tlhba}/device/detail/${params.id}`;
  return Utils.ajaxGet(url, params);
}
// 每一行的详细，=====》富川
export async function openList(params) {
  // const url = 'http://192.168.0.131:8888/device/detail/';
  const url = `${Domain.tlhba}/device/detail/`;
  return Utils.ajaxGet(url, params);
}

// 新增修改的时候，获取指定管理员
export async function searchPeople(params) {
  // const url = 'http://192.168.0.131:8888/device/person/'+params.id;
  const url = `${Domain.tlhba}/device/person/${params.id}`;
  return Utils.ajaxGet(url, params);
}
// 获取巡检岗位
export async function patrolPost(params) {
  // const url = 'http://192.168.0.131:8888/role/NJBH';
  console.log(params);
  const url = `${Domain.tlhba}/role/WNQ`;
  return Utils.ajaxGet(url, params);
}

