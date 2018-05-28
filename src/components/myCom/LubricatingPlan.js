import React from "react";
import {connect} from "dva/index";

class LubricatingPlan extends React.Component {
  render() {
    return(
      <div>润滑计划</div>
    )
  }
}
function mapStateToProps(lubricatingPlan) {
  return lubricatingPlan;
}

export default connect(mapStateToProps)(LubricatingPlan);
