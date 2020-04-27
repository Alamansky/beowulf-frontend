import Router from "next/router";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import TextArea from "./styles/TextArea";
import SickButton from "./styles/SickButton";
import { theme } from "./Page";
import styled from "styled-components";
import UpdateSuccessMessage from "./UpdateSuccessMessage";
import DeleteItem from "./DeleteItem";
import FormFooter from "./styles/FormFooter";

import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class updateItem extends Component {
  state = {};

  liftState = (childState) => {
    this.setState({ ...this.state, ...childState });
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error, called }) => (
                <Form onSubmit={(e) => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <TextInput
                      liftState={this.liftState}
                      required={true}
                      title={"title"}
                      defaultValue={data.item.title}
                    />
                    <TextInput
                      type="number"
                      liftState={this.liftState}
                      required={true}
                      title={"price"}
                      defaultValue={data.item.price}
                    />
                    <TextAreaInput
                      liftState={this.liftState}
                      required={true}
                      title={"description"}
                      defaultValue={data.item.description}
                    />
                    <FormFooter>
                      <span className="FormFooter__Buttons">
                        <SickButton backgroundColor={theme.red} type="submit">
                          Sav{loading ? "ing" : "e"} Changes
                        </SickButton>
                        <DeleteItem id={data.item.id}>Delete Item</DeleteItem>
                      </span>
                      {called && (
                        <UpdateSuccessMessage>
                          Item has updated.
                        </UpdateSuccessMessage>
                      )}
                    </FormFooter>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default updateItem;
export { UPDATE_ITEM_MUTATION };
export { SINGLE_ITEM_QUERY };
