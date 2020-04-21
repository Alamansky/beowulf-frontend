import React, { Component } from "react";
import Flag from "../static/svgs/american_flag.svg";
import Plant from "../static/svgs/plant.svg";
import Pot from "../static/svgs/pot.svg";
import Location from "../static/svgs/location.svg";
import Pencil from "../static/svgs/pencil.svg";
import Check from "../static/svgs/check.svg";

export default class Icon extends Component {
  render() {
    const iconStyle = {
      height: this.props.height || "15vw",
      width: this.props.width || "50%",
      opacity: this.props.opacity || "1",
      fill: this.props.fill || "black",
    };
    switch (this.props.icon) {
      case "flag":
        return <Flag style={iconStyle} />;
      case "plant":
        return <Plant style={iconStyle} />;
      case "pot":
        return <Pot style={iconStyle} />;
      case "location":
        return <Location style={iconStyle} />;
      case "pencil":
        return <Pencil style={iconStyle} />;
      case "check":
        return <Check style={iconStyle} />;
      default:
        break;
    }
  }
}
