import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import calcTotalPrice from "../lib/calcTotalPrice";
import Error from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";
import gql from "graphql-tag";
import { createDecipher } from "crypto";
import { TOGGLE_CART_MUTATION } from "./Cart";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $token: String!
    $customerName: String!
    $customerEmail: String!
    $customerAddress: String!
  ) {
    createOrder(
      token: $token
      customerName: $customerName
      customerEmail: $customerEmail
      customerAddress: $customerAddress
    ) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce(
    (totalItems, cartItem) => (totalItems += cartItem.quantity),
    0
  );
}

class TakeMyMoney extends React.Component {
  onToken = async (res, createOrder, toggleCart) => {
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: res.id,
        customerName: res.card.name,
        customerEmail: res.email,
        customerAddress: `${res.card.address_line1} ${res.card.address_city} ${res.card.address_state} ${res.card.address_zip}`
      }
    }).catch(err => {
      alert(err.message);
    });
    toggleCart();
    Router.push({
      pathname: "/order",
      query: { id: order.data.createOrder.id }
    });
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => {
              return (
                <Mutation
                  mutation={CREATE_ORDER_MUTATION}
                  refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                >
                  {createOrder => (
                    <StripeCheckout
                      amount={calcTotalPrice(me.cart)}
                      name="Beowulf Beard Co"
                      description={`Order of ${totalItems(me.cart)} items`}
                      image={
                        me.cart.length &&
                        me.cart[0].item &&
                        me.cart[0].item.image
                      }
                      stripeKey="pk_test_cuneRiwfxR18sDgqqv8haHmB00avtCjBnE"
                      currency="USD"
                      token={res => this.onToken(res, createOrder, toggleCart)}
                      shippingAddress
                    >
                      {this.props.children}
                    </StripeCheckout>
                  )}
                </Mutation>
              );
            }}
          </Mutation>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;
