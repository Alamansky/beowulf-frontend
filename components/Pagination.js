import React from "react";
import Link from "next/link";
import PaginationStyles from "./styles/PaginationStyles";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../config";
import Error from "./ErrorMessage";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = (props) => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return null;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page;
        return (
          <PaginationStyles>
            <Link href={{ pathname: "shop", query: { page: page - 1 } }}>
              <a className="prev" aria-disabled={page <= 1}>
                Prev
              </a>
            </Link>
            <p>
              Page {props.page} of {pages}
            </p>
            <Link href={{ pathname: "shop", query: { page: page + 1 } }}>
              <a className="next" aria-disabled={page >= pages}>
                Next
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
