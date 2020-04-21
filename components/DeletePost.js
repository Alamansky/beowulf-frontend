import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import SickButton from "./styles/SickButton";
import { theme } from "./Page";
import { BLOGPOSTS } from "./BlogPosts";
import Router from "next/router";

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: ID!) {
    deleteBlogPost(id: $id) {
      id
    }
  }
`;

export default class DeleteBlogPost extends Component {
  update = (cache, payload) => {
    // manually update the cache
    // 1. Read cache
    const data = cache.readQuery({ query: BLOGPOSTS });
    // 2. Filter the deleted item out of the page
    data.blogPosts = data.blogPosts.filter(
      blogPost => blogPost.id !== payload.data.deleteBlogPost.id
    );
    // 3. Put items back in cache
    cache.writeQuery({ query: BLOGPOSTS, data: data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_POST_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteBlogPost, { error }) => (
          <SickButton
            type="button"
            backgroundColor={theme.red}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (confirm("Are you sure you want to delete this blog post?")) {
                deleteBlogPost().catch(err => alert(err.message));
                Router.push({
                  pathname: "/blog"
                });
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
