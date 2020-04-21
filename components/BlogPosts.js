import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import WhiteSpace from "./styles/WhiteSpace";
import BlogPost from "./BlogPost";
import Breadcrumbs from "./Breadcrumbs";
import NetworkError from "./NetworkError";

const BLOGPOSTS = gql`
  query BLOGPOSTS {
    blogPosts(orderBy: id_DESC) {
      id
      title
      excerpt
      post
      image
      largeImage
    }
  }
`;

const BlogPosts = () => {
  return (
    <Query query={BLOGPOSTS}>
      {({ error, data: { blogPosts } = {} } = {}) => {
        if (error) return <NetworkError error={error} />;
        return (
          <React.Fragment>
            <Breadcrumbs
              chain={[
                ["Beowulf", "/"],
                ["Blog Posts", "/blog"],
              ]}
            ></Breadcrumbs>
            {blogPosts &&
              blogPosts.map((post) => <BlogPost post={post} key={post.id} />)}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default BlogPosts;

export { BLOGPOSTS };
