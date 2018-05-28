import React from "react";
import {connect} from "dva/index";

class AccountManagement extends React.Component {
  render() {
    return(<div>账号管理</div>)
  }
}
function mapStateToProps(accountManagement) {
  return accountManagement;
}

export default connect(mapStateToProps)(AccountManagement);
