import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";
import Pagination from "./Pagination";
import { perPage } from "../config";
import ItemsList from "../components/styles/ItemsList";
import Center from "../components/styles/Center";
import Link from "next/link";
import SickButton from "../components/styles/SickButton";
import Inner from "../components/styles/Inner";
import SectionTitle from "./styles/SectionTitle";

const FeaturedItemsSection = styled.section`
  background: ${(props) => props.theme.offWhite};
  width: 100vw;
  .product-button {
    margin: 10rem;
  }
`;

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = 2) {
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

class FeaturedItems extends Component {
  render() {
    return (
      <FeaturedItemsSection>
        <Inner>
          <Center>
            <SectionTitle>Our Latest Creations...</SectionTitle>
          </Center>
          <Center>
            <Query query={ALL_ITEMS_QUERY}>
              {({ data, error, loading }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Unable to load content.</p>;
                if (!data.items) return null;
                return (
                  <React.Fragment>
                    <ItemsList>
                      {data.items.map((item) => (
                        <Item item={item} key={item.id} />
                      ))}
                    </ItemsList>
                    <Link href="/shop">
                      <a href="/shop">
                        <SickButton className="product-button">
                          See All Products
                        </SickButton>
                      </a>
                    </Link>
                  </React.Fragment>
                );
              }}
            </Query>
          </Center>
        </Inner>
      </FeaturedItemsSection>
    );
  }
}

export default FeaturedItems;
export { ALL_ITEMS_QUERY };
