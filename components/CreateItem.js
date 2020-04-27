import Router from "next/router";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import SingleAccordian from "./SingleAccordion";
import AdminView from "./AdminView";
import TextArea from "./styles/TextArea";
import SickButton from "./styles/SickButton";
import { theme } from "./Page";
import env from "../env.json";

import UploadToCloudinary from "./UploadToCloudinary";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import { ALL_ITEMS_QUERY } from "./Items";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class createItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0,
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  liftState = (childState) => {
    this.setState({ ...this.state, ...childState });
  };

  render() {
    return (
      <AdminView>
        <Mutation
          mutation={CREATE_ITEM_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: ALL_ITEMS_QUERY }]}
        >
          {(createItem, { loading, error }) => (
            <SingleAccordian buttonText={["+ New Item", "Close"]}>
              <Form
                onSubmit={async (e) => {
                  //call mutation
                  e.preventDefault();
                  const res = await createItem();
                  Router.push({
                    pathname: "/item",
                    query: { id: res.data.createItem.id },
                  });
                }}
              >
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  <UploadToCloudinary liftState={this.liftState} />
                  <TextInput
                    liftState={this.liftState}
                    required={true}
                    title={"title"}
                  />
                  <TextInput
                    type="number"
                    liftState={this.liftState}
                    required={true}
                    title={"price"}
                  />
                  <TextAreaInput
                    liftState={this.liftState}
                    required={true}
                    title={"description"}
                  />
                  <SickButton backgroundColor={theme.red} type="submit">
                    Submit
                  </SickButton>
                </fieldset>
              </Form>
            </SingleAccordian>
          )}
        </Mutation>
      </AdminView>
    );
  }
}

export default createItem;
export { CREATE_ITEM_MUTATION };
