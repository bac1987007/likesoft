import React from "react";
import {connect} from "dva/index";

class EquipmentArchives extends React.Component {
  render() {
    <div>KM智库</div>
  }
}
function mapStateToProps(equipmentArchives) {
  return equipmentArchives;
}

export default connect(mapStateToProps)(EquipmentArchives);
