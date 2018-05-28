/**
 * Created by zhangfuchuan on 2017/9/5.
 * // .--,       .--,
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
import React from 'react';
import { connect } from 'dva';
import { Checkbox , Input, Button ,Row, Col} from 'antd';
import styles from './EPatrol.css';
import './jquery.min';


class devicePrint extends React.Component{
  onChange = (checkedValues) => {
    this.props.dispatch({
      type: 'EPatrol/updataErcodeMeth',
      payload: { checkedValues },
    });
  };

  // 设备查询时input输入框的值
  handleInputChange = (e) => {
    const inputValue = e.target.value;
    this.props.dispatch({
      type: 'deviceManagement/upload',
      payload: { inputValue },
    });
  };

  // 查询
  handleQuery = () => {
    $("#sectionToPrint").text(" ");
    const inputValue = this.props.deviceManagement.inputValue;
    const departmentSearch = this.props.deviceManagement.departmentSearch;
    this.props.dispatch({
      type: 'EPatrol/getDeviceER',
      payload: {
        data: {
          deviceCode: inputValue || '',
          deptId: departmentSearch || '',
        },
      },
    });
  };

  render(){
    const { deviceErcode  ,checkedValues } = this.props.EPatrol;
    // console.log(checkedValues);
    $("#sectionToPrint").text(" ");
    for (var i=0 ; i<checkedValues.length;i++){
      if(checkedValues!=0 && checkedValues!="" && checkedValues!= undefined && checkedValues!= null){
        var checkedValuesV = checkedValues[i].ercodeUrl;
        var srcLabelText = checkedValues[i].nameModel;
        var srcER = "<p style='display:inline-block;width:200px;margin-left:50px; margin-bottom: 25px'><img id='srcER'/><br/><label id='srcLabel'></label></p>";
        $("#sectionToPrint").append(srcER);
        $("#srcER").attr("id","srcER"+i);
        $("#srcER"+i).attr('src',checkedValuesV);
        $("#srcLabel").attr("id","srcLabel"+i);
        $("#srcLabel"+i).text(srcLabelText);
      }else {
        $("#sectionToPrint").text(" ");
      }
    }

    return(
      <div className={styles.devicePrintMain} >
        <div style={{marginLeft:50}}>
          <div className={styles.sectionNotToprint}>
            <p>
              <Input placeholder="设备编码" className={styles.devicePrintInput} onChange={this.handleInputChange} />
              <Button type="primary" ghost icon="search" onClick={this.handleQuery} className={styles.workOrderGrop}>查询</Button>
              <Button type="primary" ghost onClick={ window.print }  className={styles.workOrderGrop} > 打印二维码</Button>
            </p>
            <br/>
            <Checkbox.Group onChange={this.onChange}>
              <Row>
                {
                  deviceErcode.map((nameModels)=>{
                    return  <p><Checkbox key ={ nameModels.deviceCode } value={ nameModels } >{nameModels.nameModel}</Checkbox></p>;
                  })
                }
              </Row>
            </Checkbox.Group>,
          </div>
        </div>
        <br/>
        <br/>
        <div className={styles.sectionToPrint} id="sectionToPrint"></div>
      </div>
    )
  }
}

//model中的namespace
function mapStateToProps(EPatrol) {
  return EPatrol;
}
//抛出组件
export default connect(mapStateToProps)(devicePrint);
