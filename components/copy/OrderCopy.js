import React from "react";

function OrderCopy(props) {
  let copy = `Thank you for your order, ${props.order.customerName}!\n\nWe appreciate your business. A confirmation email with a link to this page has been sent to the email address you provided. We will follow up with a second email when your order has shipped.`;
  return <p style={{ whiteSpace: "pre-line" }}>{copy}</p>;
}

export default OrderCopy;
