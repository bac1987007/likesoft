import React from "react";
import {connect} from "dva/index";

class LubricatingStatistics extends React.Component {
  render() {
    return(
      <div>润滑统计</div>
    )
  }
}
function mapStateToProps(lubricatingStatistics) {
  return lubricatingStatistics;
}

export default connect(mapStateToProps)(LubricatingStatistics);
