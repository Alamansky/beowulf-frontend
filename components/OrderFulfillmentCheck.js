import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ORDERS_QUERY } from "./Orders";

const TOGGLE_ORDER_CHECK = gql`
  mutation TOGGLE_ORDER_CHECK($id: ID!, $fulfillment: Boolean!) {
    updateOrder(id: $id, fulfillment: $fulfillment) {
      id
    }
  }
`;

export default class OrderFulfillmentCheck extends Component {
  handleChange = updateOrder => {
    if (
      confirm(
        this.props.order.fulfilled
          ? "You are about to mark this order as unfulfilled. Proceed?"
          : "You are about to mark this order as fulfilled. Proceed?"
      )
    ) {
      updateOrder();
    }
  };
  render() {
    return (
      <Mutation
        mutation={TOGGLE_ORDER_CHECK}
        variables={{
          id: this.props.order.id,
          fulfillment: !this.props.order.fulfilled
        }}
        refetchQueries={[{ query: ORDERS_QUERY }]}
      >
        {(updateOrder, { error, loading }) => (
          <input
            type="checkbox"
            checked={this.props.order.fulfilled}
            onChange={() => this.handleChange(updateOrder)}
            disabled={loading}
          ></input>
        )}
      </Mutation>
    );
  }
}
