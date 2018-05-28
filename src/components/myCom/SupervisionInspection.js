import React from "react";
import {connect} from "dva/index";

class SupervisionInspection extends React.Component {
  render() {
    return(<div>巡检监督</div>)
  }
}
function mapStateToProps(supervisionInspection) {
  return supervisionInspection;
}

export default connect(mapStateToProps)(SupervisionInspection);
