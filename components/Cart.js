import User from "./User";
import React from "react";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import CartItem from "./CartItem";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";
import { adopt } from "react-adopt";
import TakeMyMoney from "./TakeMyMoney";
import { theme } from "./Page";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});

const Cart = () => {
  return (
    <Composed>
      {({ user, toggleCart, localState }) => {
        const me = user.data ? user.data.me : null;
        if (!me) return null;
        return (
          <CartStyles open={localState.data.cartOpen}>
            <header>
              <SickButton
                style={{ position: "absolute", zIndex: 2, right: 0 }}
                title="close"
                onClick={toggleCart}
              >
                &times;
              </SickButton>
              <Supreme>Your Cart</Supreme>
              <p>
                You have {me.cart.length} item
                {me.cart.length === 1 ? "" : "s"} in your cart
              </p>
            </header>
            <ul>
              {me.cart.map((cartItem) => (
                <CartItem cartItem={cartItem} key={cartItem.id}>
                  {cartItem.id}
                </CartItem>
              ))}
            </ul>
            <footer>
              <p>{formatMoney(calcTotalPrice(me.cart))}</p>
              {me.cart.length && (
                <TakeMyMoney>
                  <SickButton backgroundColor={theme.red}>Checkout</SickButton>
                </TakeMyMoney>
              )}
            </footer>
          </CartStyles>
        );
      }}
    </Composed>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY };
export { TOGGLE_CART_MUTATION };
