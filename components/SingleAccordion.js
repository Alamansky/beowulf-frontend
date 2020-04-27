import React, { Component } from "react";
import styled from "styled-components";
import SickButton from "./styles/SickButton";
import { theme } from "./Page";
import { propOrDefault as pod } from "../lib/propOrDefault";

const AccordianBox = styled.div`
  width: 100%;
  border: ${(props) =>
    props.open ? `2px solid ${props.theme.lightgrey}` : "none"};
  background-color: ${(props) =>
    pod(props.backgroundColor, props.theme.lightgrey, "!important")};
  position: relative;
  overflow: hidden;
  margin: 4rem 0;
`;

export default class SingleAccordion extends Component {
  state = {
    open: false,
    count: 0,
  };

  handleButtonClick = () => {
    this.setState({ open: !this.state.open });
    this.setState((state) => {
      return { count: state.count + 1 };
    });
    this.props.buttonActions && this.props.buttonActions();
  };

  render() {
    const { buttonText } = this.props;
    const {
      accordionStyle = {
        backgroundColor: null,
      },
    } = this.props;
    const { singleUse } = this.props || false;
    const AccordionButton = this.props.button || SickButton;
    return (
      <AccordianBox
        style={accordionStyle}
        backgroundColor={
          this.state.open ? accordionStyle.backgroundColor : "rgba(0, 0, 0, 0)"
        }
        open={this.state.open}
      >
        {singleUse && this.state.count >= 1 ? null : (
          <AccordionButton onClick={this.handleButtonClick}>
            {this.state.open ? buttonText[1] : buttonText[0]}
          </AccordionButton>
        )}
        {this.state.open && this.props.children}
      </AccordianBox>
    );
  }
}
