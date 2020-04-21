import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { BLOGPOSTS } from "../components/BlogPosts";
import SingleAccordion from "./SingleAccordion";
import Form from "./styles/Form";
import AdminView from "./AdminView";
import Router from "next/router";
import SickButton from "./styles/SickButton";
import { theme } from "./Page";
import UploadToCloudinary from "./UploadToCloudinary";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";

const CREATE_BLOGPOST = gql`
  mutation CREATE_BLOGPOST(
    $title: String!
    $post: String!
    $image: String!
    $largeImage: String!
    $imageSizes: [String!]!
  ) {
    createBlogPost(
      title: $title
      post: $post
      image: $image
      largeImage: $largeImage
      imageSizes: $imageSizes
    ) {
      id
    }
  }
`;

export default class CreateBlogPost extends Component {
  state = {
    title: "",
    post: "",
    image: "",
    largeImage: "",
    imageSizes: [],
    imageIsLoading: false,
  };

  liftState = (childState) => {
    this.setState({ ...this.state, ...childState });
  };

  submitForm = async (e, createBlogPost) => {
    e.preventDefault();
    const res = await createBlogPost();
    this.setState({ title: "", post: "", image: "" });
    Router.push({
      pathname: "/post",
      query: { id: res.data.createBlogPost.id },
    });
  };

  render() {
    let { imageIsLoading, ...postState } = this.state;
    return (
      <AdminView>
        <Mutation
          mutation={CREATE_BLOGPOST}
          variables={postState}
          refetchQueries={[{ query: BLOGPOSTS }]}
        >
          {(createBlogPost, { error, loading }) => {
            return (
              <SingleAccordion buttonText={["+ New Post", "Close"]}>
                <Form
                  onSubmit={(e) => this.submitForm(e, createBlogPost)}
                  className="newBlogPost"
                >
                  <fieldset disabled={loading} aria-busy={loading}>
                    <UploadToCloudinary liftState={this.liftState} />
                    <TextInput
                      liftState={this.liftState}
                      required={true}
                      title={"title"}
                    />
                    <TextAreaInput
                      liftState={this.liftState}
                      required={true}
                      title={"post"}
                    />
                    <SickButton
                      type="submit"
                      backgroundColor={theme.red}
                      disabled={this.state.imageIsLoading}
                    >
                      Submit
                    </SickButton>
                  </fieldset>
                </Form>
              </SingleAccordion>
            );
          }}
        </Mutation>
      </AdminView>
    );
  }
}
