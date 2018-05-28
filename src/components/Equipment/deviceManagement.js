/*
 * by 2017-7-12  jack
 * */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Input, Popconfirm, Button, Select ,BackTop, Upload, message, Icon} from 'antd';
import styles from './deviceManagement.less';
import FormPage from './formAdd';
import PageInfo from './PageInfo';
// 定义option
const Option = Select.Option;


// 分页组件
const propsInfo ={
  name: 'file',
  action: '/ework/v1/ework/v1/dcitem/import',
  multiple:'true', //多个文件
  headers: {
    // authorization: 'authorization-text',
    contentType:"multipart/form-data",
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      this.handleQuery();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} `);
      this.handleQuery();
    }
  },
};


// 列表组件==》先默认为最大组件
class DeviceManagement extends React.Component {
  constructor(props) {
    // console.log(props);
    super(props);
    // console.log(props);
    this.columns = [{
      title: '设备编码',
      dataIndex: 'deviceCode',
      width: '25%',
      // render: (text, record, index) => this.renderColumns(this.props.dataList, index, 'deviceCode', text),
    }, {
      title: '名称及规格',
      dataIndex: 'nameModel',
      width: '30%',
      // render: (text, record, index) => this.renderColumns(this.props.dataList, index, 'nameModel', text),
    }, {
      title: '所属部门',
      dataIndex: 'deptCn',
      width: '25%',
      // render: (text, record, index) => this.renderColumns(this.props.dataList, index, 'deptId', text),
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      render: (text, record, index) => {
        const id = record.deviceId;
        return (
          <div>
            <FormPage title={<Icon type="edit" />} idCard={id} className={styles.FormPag} />
            <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(id)}>
              <Button type="danger" className={styles.equipdelete}><Icon type="delete" /></Button>
            </Popconfirm>
            <Button type="primary" className={styles.xjdetails} onClick={() => this.goToAgencyUpgrade(id)}>设置巡检项目</Button>
          </div>
        );
      },
    }];
  }
// 跳转详情页
  goToAgencyUpgrade = (id) => {
    localStorage.removeItem('deviceId');
    localStorage.setItem('deviceId', id);
    this.props.dispatch(routerRedux.push({
      pathname: '/EPatrol',
      query: {
        deviceId: id,
      },
    }));
  };
  // 设备查询时input输入框的值
  handleInputChange = (e) => {
    const inputValue = e.target.value;
    // console.log(inputValue);
    this.props.dispatch({
      type: 'deviceManagement/upload',
      payload: { inputValue },

    });
  };
// 获取点击搜索时的部门
  handleOPChange=(key) => {
    this.props.dispatch({
      type: 'deviceManagement/upload',
      payload: {
        departmentSearch: key,
      },
    });
  };
// 查询
  handleQuery = () => {
    // console.log(this.props.deviceManagement.inputValue);
    const inputValue = this.props.deviceManagement.inputValue;
    const departmentSearch = this.props.deviceManagement.departmentSearch;

    let  ruleOrgId = "";
    if (this.props.deviceManagement.dept && this.props.deviceManagement.dept.orgId){
      ruleOrgId =  this.props.deviceManagement.dept.orgId;
    }
    this.props.dispatch({
      type: 'deviceManagement/query',
      payload: {
        data: {
          deviceCode: inputValue || '',
          deptId: departmentSearch || '',
          orgId:ruleOrgId,
          pageNum: '10',
          currentPage: '1',
        },
      },
    });
  };

  // 获取所有的部门
  getDepartment = () => {
    this.props.dispatch({
      type: 'deviceManagement/department',
      payload: {
      },
    });
  };
  // 获取巡检岗位
  getPatrolPost = () => {
    this.props.dispatch({
      type: 'deviceManagement/patrolPost',
      payload: {
      },
    });
  };
  // componentWillMount() {
  //
  // };
  componentDidMount(){
    this.getDepartment();
    this.getPatrolPost();
    this.handleQuery();
  }

  // 删除一整行
  onDelete = (id) => {
    this.props.dispatch({
      type: 'deviceManagement/removeFormList',
      payload: {
        id,
      },
    });
  };

  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }

  render() {
    const { dataList, pagination, loading, dept } = this.props.deviceManagement;
    const dataSource = dataList;
    const propDepartment = dept;
    const department = propDepartment.map(obj => <Option key={obj.deptId}>{obj.dept}</Option>);
    // es5
    // const department = [];
    // for (let i = 0; i < propDepartment.length; i++) {
    //   department.push(<Option key={propDepartment[i]}>{propDepartment[i]}</Option>);
    // }


    const columns = this.columns;
    return (
      <div className={styles.container1}>
        <div className={styles.topOne}>
          <div>
            <span>设备编码</span>
            <div className="example-input">
              <Input placeholder="输入设备编码" className={styles.einput} onChange={this.handleInputChange} />
            </div>
          </div>
          <div>
            <span>归属部门</span>
            <div>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择一个部门"
                optionFilterProp="children"
                onChange={this.handleOPChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {department}
              </Select>
            </div>
          </div>
          <Button icon="search" onClick={this.handleQuery} style={{float:"left"}}>查询</Button>
          <p><FormPage title="新增" /></p>
          <span className={styles.upLoadExcel}>
            <Upload {...propsInfo }>
              <Button>
                <Icon type="upload"/> Excel文件导入
              </Button>
            </Upload>
          </span>
        </div>
        <div className={styles.clearfix} />
        <Table
          bordered
          rowKey={record => record.registered}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={loading}
          onChange={this.handleTableChange}
        />
        <PageInfo style={{ width: 600, marginTop: 30, float: 'right' }} />

      </div>
    );
  }
}

// ReactDOM.render(<EditableTable />, mountNode);
// 与model层建立数据联系
function mapStateToProps(deviceManagement) {
  return deviceManagement;
}

// const deviceManagementForm = Form.create()(deviceManagement);

export default connect(mapStateToProps)(DeviceManagement);
