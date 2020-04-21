import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { parseISO, format } from "date-fns";
import Head from "next/head";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import OrderStyles from "./styles/OrderStyles";
import OuterBorder from "./styles/OuterBorder";
import OrderCopy from "./copy/OrderCopy";
import SickButton from "./styles/SickButton";
import Link from "next/link";
import Center from "./styles/Center";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      customerName
      customerAddress
      customerEmail
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

class Order extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  state = {
    orderID: this.props.id,
  };

  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.state.orderID }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <span>Loading...</span>;
          const order = data.order;
          return (
            <React.Fragment>
              <OuterBorder style={{ marginBottom: "2rem" }}>
                <OrderCopy order={order} />
              </OuterBorder>
              <OrderStyles data-test="order">
                <Head>
                  <title>Sick Fits - Order {order.id}</title>
                </Head>
                <p>
                  <span>Email:</span>
                  <span>{order.customerEmail}</span>
                </p>
                <p>
                  <span>Order ID:</span>
                  <span>{this.state.orderID}</span>
                </p>
                <p>
                  <span>Date:</span>
                  <span>
                    {format(parseISO(order.createdAt), "PPpp", {
                      awareOfUnicodeTokens: true,
                    })}
                  </span>
                </p>
                <p>
                  <span>Shipping Address:</span>
                  <span>{order.customerAddress}</span>
                </p>
                <p>
                  <span>Total Item Count:</span>
                  <span>{order.items.length}</span>
                </p>
                <div className="items">
                  <p>Item(s) in This Order:</p>
                  {order.items.map((item) => (
                    <div className="order-item" key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div className="item-details">
                        <h2>{item.title}</h2>
                        <p>Qty: {item.quantity}</p>
                        <p>Unit Price: {formatMoney(item.price)}</p>
                        <p>
                          Sub-total: {formatMoney(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p>
                  <span>ORDER TOTAL:</span>
                  <span>{formatMoney(order.total)}</span>
                </p>
              </OrderStyles>
              <Link
                href={{
                  pathname: "/",
                }}
              >
                <Center>
                  <SickButton>Home Page</SickButton>
                </Center>
              </Link>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Order;
export { SINGLE_ORDER_QUERY };
