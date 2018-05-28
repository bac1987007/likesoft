/**
 * Created by shangxin on 2017/7/25.
 */

import React from 'react';
import { connect } from 'dva';
import { Table,Icon,Popover } from 'antd';
import styles from '../Equipment/deviceManagement.less';
var AndroldeviceId;
var Androldevicecn;
//气泡卡插件，提示信息
class PopoverInfo extends React.Component {
  state = {
    visible: false,
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  render() {
   const PopInfo = this.props.reacd
    return (
      <Popover
        style={{width:"80%",padding:"20%"}}
        placement="left"
        content={<div>
                  <p>{PopInfo.execMem}</p>

            </div>}
       // title={PopInfo.taskTitle}
        title="维修经验"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Icon type="question-circle"  style={{fontSize: 16,cursor:"pointer"}}/>
      </Popover>
    );
  }
}
// 列表组件==》先默认为最大组件===>设备异常列表
class MaintenanceRecord extends React.Component {
  constructor(props) {
    super(props);
    AndroldeviceId =  this.props.location.query.deviceId;
    Androldevicecn =  this.props.location.query.deviceCn;
    this.columns = [{
      title: '工单',
      dataIndex: 'taskTitle',
    }, {
      title: '问题类型',
      dataIndex: 'issueTypeCn',
    }, {
      title: '发起时间',
      dataIndex: 'beginDttm',
    }, {
      title: '完成时间',
      dataIndex: 'endDttm',
    },
    {
      title: '查看',
      dataIndex: 'info',
      width: '10%',
      render: (text, record) => {
        if(!record.execDttm){
          return(
            <span></span>
          )
        }else{
          return(
            <PopoverInfo reacd={record}/>
          )
        }

      }
    },
    ];
  }
  // 加载完成后执行数据列表查询,更新model
  componentWillMount() {
    const weixiuDeviceId = localStorage.getItem('weixiuDeviceId');

    this.props.dispatch({
      type: 'Evaluation/queryrepair',
      payload: {
        weixiuDeviceId,
      },
    });
    //衔接安卓的model更新

    if(AndroldeviceId){
      this.props.dispatch({
        type: 'Evaluation/queryrepair',
        payload: {
          AndroldeviceId,
        },
      });
    }
  }
  render() {
    let WXDeviceCn;
    if(Androldevicecn){
       WXDeviceCn = Androldevicecn;
    }else{
       WXDeviceCn = localStorage.getItem('WXDeviceCn');
    }
    const { repairList } = this.props.Evaluation;
    const dataSource = repairList;
    const columns = this.columns;
    return (
      <div>
        <div className={styles.topOne}>
          <p style={{ textAlign: 'center', fontSize: 18 }}>{WXDeviceCn}——设备维修记录</p>
        </div>
        <Table
          bordered
          rowKey={record => record.registered}
          dataSource={dataSource}
          columns={columns}
          pagination={false}

        />
      </div>


    );
  }
}

// ReactDOM.render(<EditableTable />, mountNode);
// 与model层建立数据联系
function mapStateToProps(Evaluation) {
  return Evaluation;
}

// const deviceManagementForm = Form.create()(deviceManagement);

export default connect(mapStateToProps)(MaintenanceRecord);

