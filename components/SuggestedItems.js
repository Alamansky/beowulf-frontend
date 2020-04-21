import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import InnerBorder from "./styles/InnerBorder";
import SectionTitle from "./styles/SectionTitle";
import changeAlpha from "../lib/changeAlpha";

const SuggestedItemsBar = styled.div`
  display: flex;
  background-color: white;
  justify-content: space-around;
  padding: 2rem;
  border: 2px solid ${({ theme }) => changeAlpha(theme.lightgrey, 0.5)};
`;

const SuggestedItem = styled.div`
  background-color: white;
  max-width: 200px;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => changeAlpha(theme.lightgrey, 0.5)};

  &:hover {
    border-bottom: ${props => `2px solid ${props.theme.grey}`};
  }
`;

const SuggestedItemImage = styled.img`
  width: 100%;
`;

const SUGGESTED_ITEMS = gql`
  query SUGGESTED_ITEMS($first: Int = 3, $id_not: ID!) {
    items(first: $first, id_not: $id_not) {
      id
      title
      image
    }
  }
`;

const SuggestedItems = props => {
  return (
    <Query query={SUGGESTED_ITEMS} variables={{ id_not: props.id }}>
      {({ data }) => {
        return (
          <React.Fragment>
            <SectionTitle>Other Fine Products:</SectionTitle>
            <SuggestedItemsBar>
              {data.items.map(item => (
                <Link
                  href={{ pathname: "/item", query: { id: item.id } }}
                  key={item.id}
                >
                  <SuggestedItem>
                    <SuggestedItemImage src={item.image} />
                    <p>{item.title}</p>
                  </SuggestedItem>
                </Link>
              ))}
            </SuggestedItemsBar>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default SuggestedItems;
