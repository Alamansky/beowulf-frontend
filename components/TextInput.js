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
    let { type } = this.props || "text";
    let { required } = this.props || true;
    let { title } = this.props;
    let { defaultValue } = this.props || null;
    let stateKey = title;
    const titleCap = cap(title);
    return (
      <label htmlFor={title}>
        <h3>{titleCap}</h3>
        <input
          type={type}
          id={title}
          name={title}
          placeholder={titleCap}
          required={required}
          value={this.state[stateKey]}
          onChange={this.handleChange}
          defaultValue={defaultValue}
          autoComplete={type == "password" ? "new-password" : "off"}
        />
      </label>
    );
  }
}
