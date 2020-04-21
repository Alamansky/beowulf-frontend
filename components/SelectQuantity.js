import React, { Component } from "react";
import styled from "styled-components";
import ClickableText from "./styles/ClickableText";
import changeAlpha from "../lib/changeAlpha";

const QuantityControls = styled.div`
  display: flex;
  justify-content: center;
  animation: fadeIn 0.5s forwards ease;
  opacity: 0;
  border: 1px solid ${({ theme }) => changeAlpha(theme.lightgrey, 0.5)};
  padding: 1rem;
  margin: 1rem;

  @keyframes fadeIn {
    100% {
      opacity: 1;
    }
  }

  > * {
    margin: 1rem;
  }

  input[type="number"] {
    text-align: center;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default class SelectQuantity extends Component {
  state = {
    buttonText: "Add to Cart",
    quantity: 1,
    readytoConfirm: false,
  };

  confirmQuantity = () => {
    this.setState({ readytoConfirm: true });
  };
  render() {
    const CustomButton = this.props.button;
    return (
      <React.Fragment>
        <ClickableText
          mode="dark"
          onClick={() =>
            this.setState({ readytoConfirm: !this.state.readytoConfirm })
          }
        >
          Select Quantity
        </ClickableText>
        {this.state.readytoConfirm && (
          <QuantityControls>
            <CustomButton
              onClick={() =>
                this.state.quantity > 0 && this.props.updateQuantity("subtract")
              }
            >
              -
            </CustomButton>
            <input
              type="number"
              value={this.props.quantity}
              style={{ width: "50px" }}
            ></input>
            <CustomButton onClick={() => this.props.updateQuantity("add")}>
              +
            </CustomButton>
          </QuantityControls>
        )}
      </React.Fragment>
    );
  }
}
