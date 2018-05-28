/**
 * Created by shangxin on 2017/7/25.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './evaluation.less';
import { Table } from 'antd';

// 列表组件==》先默认为最大组件===>设备异常列表
class DetailsOfWork extends React.Component {
  constructor(props) {
    // console.log(props);
    super(props);
      this.columns = [{
      title: '巡检部位',
      dataIndex: 'ckPart',
        width:20,
      render: (text, row, index) => {

        return {
          children: <a href="javascript:;">{text}</a>,
        };
      },
    }, {
      title: '巡检内容',
      dataIndex: 'checkItem',
        width:20,

    }, {
      title: '巡检人',
      width:30,
      render: (value, row, index) => {
        let values = value;
        return {
          children: <span>
                    {
                      values.collectInfos.map(function (key) {
                        return <div className={styles.tableRow}>
                          <span>{key.userName}</span>
                        </div>
                      })
                    }
                </span>
        }
      },
    }, {
      title: '时间',
      width:20,
      render: (value, row, index) => {
        let values = value;
        return {
          children: <span>
                      {
                        values.collectInfos.map(function (key) {
                          return <div className={styles.tableRow}>
                            <span>{key.ckTime}</span>
                          </div>
                        })
                      }
                  </span>
        }
      },
    }, {
      title: '巡检结果',
      width:10,
        render: (value, row, index) => {
          let values = value;

          return {
            children: <span>
                      {
                        values.collectInfos.map(function (key) {
                          var ClassTable;
                          if(key.checkResult==0){
                            ClassTable = styles.table0;
                          }else if(key.checkResult==1){
                            ClassTable = styles.table1;
                          }else if(key.checkResult==2){
                            ClassTable = styles.table2;
                          }
                          return <div className={ClassTable}>
                            <span className={"tableTd"+key.checkResult}>{key.collectInfo?key.collectInfo:"哎呀，下次记得填写巡检数据哦，不填要扣钱的..."}</span>
                          </div>
                        })
                      }
                  </span>
          }
        },

    }];
  }
  getOldWorkList = () => {
    this.props.dispatch({
      type: 'Evaluation/queryWorkOld',
      payload: {
      },
    });
  }

  componentDidMount() {
    this.getOldWorkList();
  }

  render()
  {
    const data = this.props.Evaluation.oldWorkList;
    const columns = this.columns;
    return (
      <div>
        <p style={{ textAlign: 'center', fontSize: 18 ,margin:"10px 0"}}>巡检交接明细</p>
        <Table dataSource={data}
               bordered
               columns={columns}
               className={styles.checkTable}
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

export default connect(mapStateToProps)(DetailsOfWork);

