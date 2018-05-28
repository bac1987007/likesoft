/**
 * Created by zhangfuchuan on 2017/12/17.
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
      title: '质检项目',
      dataIndex: 'qiItemName',
      key: 'qiItemName',
      width: '20%',
    }, {
      title: '质检结果',
      dataIndex: 'qiVal',
      key: 'qiVal',
      width: '20%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'qiVal')}
        />
      ),
    }, {
      title: '正常值-最大',
      dataIndex: 'normalMax',
      key: 'normalMax',
      width: '20%',
    }, {
      title: '正常值-最小',
      dataIndex: 'normalMix',
      key: 'normalMix',
      width: '20%',
    }, {
      title: '偏离值',
      dataIndex: 'qiOffset',
      key: 'qiOffset',
      width: '20%',
      render: (text, record, index) => (
        <Select
          showSearch
          onChange={this.onCellChange(index, 'qiOffset')}
          // defaultValue="normal"
          placeholder="请选择"
        >
          <Option value="偏高">偏高</Option>
          <Option value="正常">正常</Option>
          <Option value="偏低">偏低</Option>
        </Select>
      ),
    }
    // , {
    //   title: '操作',
    //   dataIndex: 'operation',
    //   key: 'operation',
    //   width: '20%',
    //   render: (text, record, index) => {
    //     return (
    //       <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(index)}>
    //         <a href="#">删除</a>
    //       </Popconfirm>
    //     );
    //   },
    // }
    ];
  }
  onCellChange = (index, key) => {
    return (value) => {
      if(this.props && this.props.EPatrol && this.props.EPatrol.yangpinTable.length>0 ){
        const ZhiTabData = this.props.EPatrol.yangpinTable;
        ZhiTabData[index][key] = value;
        this.props.dispatch({
          type: 'EPatrol/getCollectionTable',
          payload:{ZhiTabData},
        });
      }
    };
  };
  // onDelete = (index) => {
  //   const collects = this.props.EPatrol.deviceInfo.collects;
  //   collects.splice(index, 1);
  //   this.props.dispatch({
  //     type: 'EPatrol/getCollectionTable',
  //     payload:{collects},
  //   });
  // };

  render() {
    const {yangpinTable} =this.props.EPatrol;  //选择质检类型后的data渲染
    const columns = this.columns;
    return (
      <div className={styles.cjMainPo}>
        <Table
          bordered
          dataSource={ yangpinTable }
          columns={columns}
        />
      </div>
    );
  }
}


function mapStateToProps(EPatrol) {
  return EPatrol;
}
export default connect (mapStateToProps) (CjconTable);

