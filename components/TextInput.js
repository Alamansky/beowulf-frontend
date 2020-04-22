import React, { Component } from "react";
import { capitalizeFirstLetter as cap } from "../lib/capitalizeFirstLetter";

export default class TextInput extends Component {
  state = {};

  handleChange = (e) => {
    const { liftState } = this.props;
    const { name, type, value } = e.target;
    this.setState({ [name]: value }, () => liftState && liftState(this.state));
  };

  render() {
    let {
      type = "text",
      required = true,
      defaultValue = null,
      title,
    } = this.props;
    let { stateKey = title } = this.props;
    let { value = this.state[stateKey] } = this.props;
    const titleCap = cap(title);
    return (
      <label htmlFor={title}>
        <h3>{titleCap}</h3>
        <input
          type={type}
          id={title}
          name={stateKey}
          placeholder={titleCap}
          required={required}
          value={value}
          onChange={this.handleChange}
          defaultValue={defaultValue}
          autoComplete={type == "password" ? "new-password" : "off"}
        />
      </label>
    );
  }
}
