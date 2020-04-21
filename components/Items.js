import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";
import Pagination from "./Pagination";
import { perPage } from "../config";
import ItemsList from "../components/styles/ItemsList";
import Center from "../components/styles/Center";
import Breadcrumbs from "./Breadcrumbs";
import NetworkError from "./NetworkError";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: id_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

class Items extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          chain={[
            ["Beowulf", "/"],
            ["Shop", "/shop"],
          ]}
        ></Breadcrumbs>
        <Center>
          <Pagination page={this.props.page} />
          <Query
            query={ALL_ITEMS_QUERY}
            variables={{
              skip: this.props.page * perPage - perPage,
              first: Number(perPage),
            }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <NetworkError error={error} />;
              return (
                <ItemsList>
                  {data.items.map((item) => (
                    <Item item={item} key={item.id} />
                  ))}
                </ItemsList>
              );
            }}
          </Query>
          <Pagination page={this.props.page} />
        </Center>
      </React.Fragment>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
