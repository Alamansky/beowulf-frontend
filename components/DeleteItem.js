import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";
import SickButton from "./styles/SickButton";
import { theme } from "./Page";
import Router from "next/router";
import scrollToTop from "../lib/scrollToTop";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default class DeleteItem extends Component {
  update = (cache, payload) => {
    // manually update the cache
    // 1. Read cache
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. Filter the deleted item out of the page
    data.items = data.items.filter(
      (item) => item.id !== payload.data.deleteItem.id
    );
    // 3. Put items back in cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data: data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <SickButton
            backgroundColor={theme.red}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (confirm("Are you sure you want to delete this item?")) {
                deleteItem().catch((err) => alert(err.message));
                Router.push({
                  pathname: "/shop",
                }).then(() => scrollToTop());
              }
            }}
          >
            {this.props.children}
          </SickButton>
        )}
      </Mutation>
    );
  }
}
