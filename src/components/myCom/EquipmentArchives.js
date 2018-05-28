import React from "react";
import {connect} from "dva/index";

class EquipmentArchives extends React.Component {
  render() {
    return(<div>设备档案</div>)
  }
}
function mapStateToProps(equipmentArchives) {
  return equipmentArchives;
}

export default connect(mapStateToProps)(EquipmentArchives);
