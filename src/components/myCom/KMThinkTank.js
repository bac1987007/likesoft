import React from "react";
import {connect} from "dva/index";

class KMThinkTank extends React.Component {
  render() {
    return(<div>KM智库</div>)
  }
}
function mapStateToProps(kmThinkTank) {
  return kmThinkTank;
}

export default connect(mapStateToProps)(KMThinkTank);
