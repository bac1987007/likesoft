/**
 * Created by zhangfuchuan on 2017/7/27.
// .--,       .--,
 //  ( (  \.---./  ) )
 //   '.__/o   o\__.'
 //      {=  ^  =}
 //       >  -  <
 //      /       \
 //     //       \\
 //    "'\       /'"_.-~^`'-.
 //       \  _  /--'         `
 //     ___)( )(___
 //    (((__) (__)))    高山仰止,景行行止.虽不能至,心向往之。
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Util, AntModal, MockData } from '../../utils/CommonUtil';
import { Table, Input, Popconfirm, Modal, Button,Select,Form , Icon,Tooltip} from 'antd';
import styles from './Cjcon.css';

//可编辑单元格
class EditableCell extends React.Component {
    state = {
      value: this.props.value,
      editable: false,
    }
    handleChange = (e) => {
      const value = e.target.value;
      this.setState({value});
    }
    check = () => {
      this.setState({editable: false});
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
        // this.props.onChange(this.props.value);
      }
    }
    edit = () => {
      this.setState({editable: true});
    }
  render() {
    const {  editable , value} = this.state;
    // const { value } = this.props;
    return (
      <div className={styles.editableCell}>
        {
          editable ?
            <div className={styles.editableCellInputWrapper}>
              <Input
                value={value}
                onChange={this.handleChange.bind(this)}
                onPressEnter={this.check.bind(this)}
              />
              <Icon
                type="check"
                className={styles.editableCellIconCheck}
                onClick={this.check.bind(this)}
              />
            </div>
            :
            <div className={styles.editableCellTextWrapper }>
              {value || ' '}
              <Icon
                type="edit"
                className={styles.editableCellIcon}
                onClick={this.edit.bind(this)}
              />
            </div>
        }
      </div>
    );
  }
}
//采集信息单元格组件
class CjconTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
    this.columns = [{
      title: '采集信息',
      dataIndex: 'collectItem',
      key: 'collectItem',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'collectItem')}
        />
      ),
    }, {
      title: '采集方式',
      dataIndex: 'dataSourcetype',
      key: 'dataSourcetype',
      width: '20%',
      render: (text, record, index) => (
      // <Select value={record ? record.dataSourcetype : option.value} style={{ width: 120 }}>
      //   <Option value="直接">直接</Option>
      //   <Option value="选择">选择</Option>
      // </Select>
          <EditableCell
            value={text}
            onChange={this.onCellChange(index, 'dataSourcetype')}
          />
      ),
    }, {
      title: '信息内容',
      dataIndex: 'dataSource',
      key: 'dataSource',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={record.dataSource}
          onChange={this.onCellChange(index, 'dataSource')}
        />
      ),
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '20%',
      render: (text, record, index) => {
        return (
          this.props.EPatrol.deviceInfo.collects.length > 0 ?
            (
              <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(index)}>
                <a href="#">删除</a>
              </Popconfirm>
            ) : null
        );
      },
    }];
  }
  onCellChange = (index, key) => {
    return (value) => {
      const collects = this.props.EPatrol.deviceInfo.collects;
      collects[index][key] = value;
      this.props.dispatch({
        type: 'EPatrol/getCollectionTable',
        payload:{collects},
      });
    };
  };
  onDelete = (index) => {
    const collects = this.props.EPatrol.deviceInfo.collects;
    collects.splice(index, 1);
    this.props.dispatch({
      type: 'EPatrol/getCollectionTable',
      payload:{collects},
    });
  };
  handleAdd = () => {
    const { deviceInfo } = this.props.EPatrol;
    const { collects } = deviceInfo;
    const collect = collects ? collects : [];
    const newData = {
      key: collect.length +1,
      collectItemId:"",
      collectItem: '',
      dataSourcetype: '',
      dataSource: '',
    };
    collect.push(newData);
    deviceInfo.collects = collect;
    this.props.dispatch({
      type: 'EPatrol/getCollectionTable',
      payload:{deviceInfo},
    });
  };
  render() {
    const { deviceInfo } = this.props.EPatrol;
    const columns = this.columns;
    const collects =[];
    const tips =' [{"_ID":"10","_CN":"正常","OK":"Y"},{"_ID":"20","_CN":"轻微","OK":"Y"},{"_ID":"30","_CN":"严重","OK":"N"}]';
    if(deviceInfo.collects){
      deviceInfo.collects.map((data, index) => {
        const result = data;
        result.key = index;
        return collects.push(result);
      });
    }

    return (
      <div className={styles.cjMainPo}>
        <Button className={styles.editableAddBtn} onClick={this.handleAdd}>添加</Button>
        <Table
          bordered
          dataSource={ collects }
          columns={columns}
        />
        <Tooltip placement="topRight" title={<div>
          <h4 style={{color:"#FFF"}}>录入方式：</h4>
          <p>FIX（固定式选择录入）</p>
          <p>STR（直接录入）</p>
        </div>} style={{}}>
          <Icon type="question-circle" style={{ fontSize: 16, color: '#08c',zIndex:"9" ,top:"55px",left:"210px",position:"absolute"}} />
        </Tooltip>
        <Tooltip placement="topRight" title={<div>
          <h4 style={{color:"#FFF"}}>录入方式：</h4>
          <p>{tips}</p>
        </div>} style={{}}>
          <Icon type="question-circle" style={{ fontSize: 16, color: '#08c',zIndex:"9" ,top:"55px",left:"320px",position:"absolute"}} />
        </Tooltip>
      </div>
    );
  }
}

function mapStateToProps(EPatrol) {
  return EPatrol;
}
export default connect (mapStateToProps) (CjconTable);

