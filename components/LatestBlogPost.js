import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import BlogPost from "./BlogPost";
import Inner from "./styles/Inner";
import Section from "./styles/Section";
import Center from "./styles/Center";
import SickButton from "./styles/SickButton";
import Link from "next/link";
import SectionTitle from "./styles/SectionTitle";
import Error from "./ErrorMessage";

const LATEST_POST = gql`
  query LATEST_POST($last: Int = 1) {
    blogPosts(last: $last) {
      id
      title
      excerpt
      image
      largeImage
    }
  }
`;

export default class LatestBlogPost extends Component {
  render() {
    return (
      <Query query={LATEST_POST}>
        {({ data, error }) => {
          let hasBlogPosts = data && data.blogPosts;

          return (
            <Section backgroundColor="rgba(255, 255, 255, 0.8)">
              <Inner>
                <Center>
                  <SectionTitle>From our Blog...</SectionTitle>
                </Center>
                {hasBlogPosts && (
                  <React.Fragment>
                    <Link
                      href={{
                        pathname: "post",
                        query: { id: data.blogPosts[0].id },
                      }}
                      passHref
                    >
                      <BlogPost post={data.blogPosts[0]} />
                    </Link>
                    <Link
                      href={{
                        pathname: "blog",
                      }}
                      passHref
                    >
                      <Center>
                        <SickButton style={{ margin: "10rem" }}>
                          See All Posts
                        </SickButton>
                      </Center>
                    </Link>
                  </React.Fragment>
                )}
                {!hasBlogPosts && <Center>Unable to load content.</Center>}
              </Inner>
            </Section>
          );
        }}
      </Query>
    );
  }
}
