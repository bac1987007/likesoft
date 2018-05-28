import React from 'react';
import { Router, Route } from 'dva/router';
import SiderDemo from './routes/index';
import equipment from './components/Equipment/deviceManagement';
import maintainRecord from './components/myCom/MaintainRecord.js';
import homepage from './components/myCom/HomePage';
import accountManagement from './components/myCom/AccountManagement';
import repairPlan from './components/myCom/RepairPlan';
import equipmentArchives from './components/myCom/EquipmentArchives';
import supervisionInspection from './components/myCom/SupervisionInspection';
import lubricatingPlan from './components/myCom/LubricatingPlan';
import kmThinkTank from './components/myCom/KMThinkTank';
import lubricatingStatistics from './components/myCom/LubricatingStatistics';
import EPatrol from './components/myCom/EPatrol';
import abnormalList from './components/myCom/AbnormalList';
import LoginForm from './components/login/login';
import ContentInfo from './routes/indexMain';
import Evaluation from './components/Evaluation/Evaluation';
import maintenanceRecord from './components/Evaluation/maintenanceRecord';
import detailsOfWork from './components/Evaluation/detailsOfWork';
import DcCheckLine from './components/DcCheckLine/DcCheckLine';
import checkWork from './components/myCom/checkWork';
import idrz from './components/login/idrz';
import changePw from './components/login/changePw';
import devicePrint from './components/myCom/devicePrint';
import workOrder from './components/myCom/workOrder';
import IllegalLbs from './components/myCom/IllegalLbs';
import IllegalAll from './components/myCom/IllegalAll';
import mobileMaintenance from './components/Evaluation/mobileMaintenance';// 手机维修记录
import mobileDetailsOfWork from './components/Evaluation/mobileDetailsOfWork';// 手机交接班明细
import qualityConfig from './components/myCom/qualityConfig'; // 质检配置
import qualityRecord from './components/myCom/qualityRecord';  // 质检录入
import qualityList from './components/myCom/qualityList';// 质检列表
import Broken from './components/myCom/Broken';// 折线图
import WxBind from './components/login/wxBind'; // 微信绑定

const rootRoute = (
  <Route>
    <Route path="/Evaluation" component={Evaluation} />
    <Route path="/maintenanceRecord" component={maintenanceRecord} />
    <Route path="/mobileMaintenance" component={mobileMaintenance} />
    <Route path="/detailsOfWork" component={detailsOfWork} />
    <Route path="/mobileDetailsOfWork" component={mobileDetailsOfWork} />
    <Route path="/equipment" component={equipment} />
    <Route path="/DcCheckLine" component={DcCheckLine} />
    <Route path="/checkWork" component={checkWork} />
    <Route path="/idrz" component={idrz} />
    <Route path="/changePw" component={changePw} />
    <Route path="/workOrder" component={workOrder} />
    <Route path="/devicePrint" component={devicePrint} />
    <Route path="/IllegalAll" component={IllegalAll} />
    <Route path="/IllegalLbs" component={IllegalLbs} />
    <Route path="/Broken" component={Broken} />
    { /* 录入设置移动端配置*/ }
    <Route path="/qualityConfigMobile" component={qualityConfig} />
    <Route path="/qualityRecordMobile" component={qualityRecord} />
    <Route path="/qualityListMobile" component={qualityList} />
    <Route path="/wxBind" component={WxBind} />

    <Route path="/" component={LoginForm} />
    <Route path="/HOME" component={SiderDemo}>
      <Route path="/equipmentInfo" component={ContentInfo}>
        <Route path="/HOMEPAGE" component={homepage} />
        { /* 润滑管理 */ }
        <Route path="/RHJH" component={lubricatingPlan} />
        <Route path="/RHTJ" component={lubricatingStatistics} />
        { /* 设备管理 */ }
        <Route path="/WXJL" component={maintainRecord} />
        <Route path="/JXJH" component={repairPlan} />
        <Route path="/DAGL" component={equipmentArchives} />

        <Route path="/WGTJ" component={IllegalAll} />
        <Route path="/XJJD" component={supervisionInspection} />
        <Route path="/ZHGL" component={accountManagement} />
        <Route path="/YCGD" component={abnormalList} />
        <Route path="/ZKMZK" component={kmThinkTank} />
        { /* 质检 */ }
        <Route path="/ZJGL" component={qualityConfig} />
        <Route path="/qualityRecord" component={qualityRecord} />
        <Route path="/ZJ" component={qualityList} />
        { /* 统计分析*/ }
        <Route path="/SBYZL" component={Evaluation} />
        <Route path="/WGZM" component={IllegalAll} />
        <Route path="/ZJFX" component={Broken} />

        <Route path="/XJSBGL" component={equipment} />
        <Route path="/EPatrol" component={EPatrol} />
        <Route path="/XJXLGL" component={DcCheckLine} />
      </Route>
    </Route>
  </Route>
);

export default function ({ history }) {
  return <Router history={history} routes={rootRoute} />;
}
