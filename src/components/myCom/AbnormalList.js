import React from "react";
import {connect} from "dva/index";

class AbnormalList extends React.Component {
  render() {
    return(<div>异常工单</div>)
  }
}
function mapStateToProps(abnormalList) {
  return abnormalList;
}

export default connect(mapStateToProps)(AbnormalList);
