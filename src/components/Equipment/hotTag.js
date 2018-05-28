/**
 * Created by lawliet on 2017/7/24.
 */
/**
 * Created by lawliet on 2017/7/18.
 */
import React from 'react';
import { connect } from 'dva';
import { Tag } from 'antd';
import styles from './deviceManagement.less';

// 标签组件
let isok = 1;
const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['建筑物', '构筑物', '动力设备 ', '传导设备', '生产设备', '工具、仪器及生产用具'];
class HotTags extends React.Component {
  state = {
    selectedTags: '',
  };

  handleChange(tag, checked) {
    // this.setState({selectedTags:[]});
    isok = 0;
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
      [tag] :
      selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
    this.props.dispatch({
      type: 'deviceManagement/upload',
      payload: {
        dcType: tag,
      },
    });
    // console.log(tag);
  }

  render() {
    // console.log(this.state.selectedTags[0]);
    let oldDctype;
    if (isok == 1) {
      oldDctype = this.props.deviceManagement.editDevice.dcType;
    } else {
      oldDctype = undefined;
    }

    let { selectedTags } = this.state;
    if (oldDctype != undefined) {
      selectedTags = oldDctype;
    } else {
      selectedTags = selectedTags;
    }
    return (
      <div>
        <span style={{marginLeft:"87px"}}>类别: </span>
        <div style={{float:"right",width:"70%"}}>
          {tagsFromServer.map(tag => (
            <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={checked => this.handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </div>

      </div>
    );
  }
}
// 与model层建立数据联系
function mapStateToProps(deviceManagement) {
  return deviceManagement;
}

// const deviceManagementForm = Form.create()(deviceManagement);

export default connect(mapStateToProps)(HotTags);
