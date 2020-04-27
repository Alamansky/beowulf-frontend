import React, { Component } from "react";
import WhiteSpace from "./styles/WhiteSpace";
import Link from "next/link";
import styled from "styled-components";
import User from "./User";
import AdminView from "./AdminView";
import Icon from "./Icon";
import IconButton from "./styles/IconButton";
import changeAlpha from "../lib/changeAlpha";
import FeaturedImageDynamic from "./FeaturedImageDynamic";

const BlogThumbnail = styled.img`
  width: 200px;
  margin-right: 4rem;
`;

const Post = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => changeAlpha(theme.lightgrey, 0.5)};
  padding: 4rem 0;
  transition: 0.2s ease;
  position: relative;

  @media (max-width: 500px) {
    flex-direction: column;
  }

  &:before {
    height: 100%;
    content: "";
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.2;
  }

  > img {
    filter: grayscale(100%);
  }

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid ${(props) => props.theme.grey};

    > img {
      filter: grayscale(0%);
    }
  }

  .post__thumbnail {
    width: 200px;
    margin-right: 4rem;

    @media (max-width: 500px) {
      width: 100%;
    }
  }
`;

export default class BlogPost extends Component {
  render() {
    const post = this.props.post;
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <React.Fragment>
              <Link
                href={{ pathname: "/post", query: { id: post.id } }}
                key={post.id}
              >
                <Post className="post">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <FeaturedImageDynamic
                      imageUrl={post.image}
                      sizes="(max-width: 500px) 100vw, 200px"
                      alt={post.title}
                      className="post__thumbnail"
                    />
                  </div>
                  <div>
                    <h3>{post.title}</h3>
                    <WhiteSpace>{post.excerpt}</WhiteSpace>
                  </div>
                </Post>
              </Link>
            </React.Fragment>
          );
        }}
      </User>
    );
  }
}
