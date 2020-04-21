import { Query } from "react-apollo";
import gql from "graphql-tag";
import Center from "./styles/Center";
import Inner from "./styles/Inner";
import WhiteSpace from "./styles/WhiteSpace";
import Link from "next/link";
import styled from "styled-components";
import AdminView from "./AdminView";
import FeaturedImage from "./FeaturedImage";
import changeAlpha from "../lib/changeAlpha";
import IconButton from "./styles/IconButton";
import Icon from "./Icon";
import SingleAccordion from "./SingleAccordion";
import UpdatePost from "./UpdatePost";
import Breadcrumbs from "./Breadcrumbs";

const PrevNextNav = styled.div`
  display: flex;
  border-top: 2px solid ${({ theme }) => changeAlpha(theme.lightgrey, 0.5)};

  > * {
    flex: 1;
    text-align: center;
    padding: 2rem;
  }

  > a > span {
    padding-bottom: 1rem;
  }

  > a > span:hover {
    border-bottom: 2px solid ${(props) => props.theme.black};
  }
`;

const BlogFeaturedImage = styled.img`
  width: 100%;
`;

const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    blogPost(where: { id: $id }) {
      id
      title
      post
      previous
      next
      image
      largeImage
      imageSizes
      previousTitle
      nextTitle
    }
  }
`;

const SingleBlogPost = (props) => {
  return (
    <Query query={SINGLE_POST_QUERY} variables={{ id: props.id }}>
      {({ data: { blogPost } }) => (
        <Inner>
          <AdminView>
            <SingleAccordion buttonText={["Edit Post", "Close"]}>
              <UpdatePost id={blogPost.id}></UpdatePost>
            </SingleAccordion>
          </AdminView>
          <Breadcrumbs
            chain={[
              ["Beowulf", "/"],
              ["Blog Posts", "/blog"],
              [blogPost.title, `/post?id=${blogPost.id}`],
            ]}
          />
          <article style={{ position: "relative", marginTop: "2rem" }}>
            <FeaturedImage imageSizes={blogPost.imageSizes} />
            {/* <AdminView>
              <Link href={{ pathname: "/updatePost", query: { id: props.id } }}>
                <IconButton style={{ position: "absolute", right: "0" }}>
                  <Icon icon="pencil" height="5rem" width="5rem" fill="white" />
                </IconButton>
              </Link>
            </AdminView> */}
            <h2>{blogPost.title}</h2>
            <WhiteSpace>{blogPost.post}</WhiteSpace>
          </article>
          <PrevNextNav>
            {blogPost.previous && (
              <Link
                href={{ pathname: "/post", query: { id: blogPost.previous } }}
              >
                <a>
                  <span>{"<<  " + blogPost.previousTitle}</span>
                </a>
              </Link>
            )}

            {blogPost.next && (
              <Link href={{ pathname: "/post", query: { id: blogPost.next } }}>
                <a>
                  <span>{blogPost.nextTitle + "  >>"}</span>
                </a>
              </Link>
            )}
          </PrevNextNav>
        </Inner>
      )}
    </Query>
  );
};

export default SingleBlogPost;
