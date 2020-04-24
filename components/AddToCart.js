import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import SelectQuantity from "./SelectQuantity";

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!, $quantity: Int!) {
    addToCart(id: $id, quantity: $quantity) {
      id
      quantity
    }
  }
`;

export default class AddToCart extends Component {
  state = {
    quantity: 1,
  };

  updateQuantity = (operator) => {
    operator == "add"
      ? this.setState({ quantity: this.state.quantity + 1 })
      : this.state.quantity > 1 &&
        this.setState({ quantity: this.state.quantity - 1 });
  };

  addItemToCart = async (addToCart) => {
    const res = await addToCart();
  };

  render() {
    const { id } = this.props;
    const { quantity } = this.state;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ id, quantity }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCart, { loading }) => {
          if (this.props.button) {
            const CustomButton = this.props.button;
            return (
              <React.Fragment>
                <SelectQuantity
                  button={CustomButton}
                  updateQuantity={this.updateQuantity}
                  quantity={this.state.quantity}
                />
                <CustomButton
                  onClick={() => this.addItemToCart(addToCart)}
                  disabled={loading}
                >
                  Add{loading && "ing"} to Cart
                </CustomButton>
              </React.Fragment>
            );
          } else {
            return (
              <button
                onClick={() => this.addItemToCart(addToCart)}
                disabled={loading}
              >
                Add{loading && "ing"} to Cart
              </button>
            );
          }
        }}
      </Mutation>
    );
  }
}
