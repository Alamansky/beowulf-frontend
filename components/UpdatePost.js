import Router from "next/router";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import TextArea from "./styles/TextArea";
import SickButton from "./styles/SickButton";
import { theme } from "./Page";
import DeletePost from "./DeletePost";
import UpdateSuccessMessage from "./UpdateSuccessMessage";
import FormFooter from "./styles/FormFooter";

import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";

const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    blogPost(where: { id: $id }) {
      id
      title
      post
    }
  }
`;

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($id: ID!, $title: String, $post: String) {
    updateBlogPost(id: $id, title: $title, post: $post) {
      id
      title
      post
      image
    }
  }
`;

class updatePost extends Component {
  state = {};

  liftState = (childState) => {
    this.setState({ ...this.state, ...childState });
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateBlogPost = async (e, updateBlogPostMutation) => {
    e.preventDefault();
    const res = await updateBlogPostMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Query query={SINGLE_POST_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.blogPost)
            return <p>No blog post found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_POST_MUTATION} variables={this.state}>
              {(updateBlogPost, { loading, error, called }) => (
                <Form onSubmit={(e) => this.updateBlogPost(e, updateBlogPost)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <TextInput
                      liftState={this.liftState}
                      required={true}
                      title={"title"}
                      defaultValue={data.blogPost.title}
                    />
                    <TextAreaInput
                      liftState={this.liftState}
                      required={true}
                      title={"post"}
                      defaultValue={data.blogPost.post}
                    />
                    <FormFooter>
                      <span>
                        <SickButton backgroundColor={theme.red} type="submit">
                          Sav{loading ? "ing" : "e"} Changes
                        </SickButton>
                        <DeletePost id={data.blogPost.id}>
                          Delete Item
                        </DeletePost>
                      </span>
                      {called && (
                        <UpdateSuccessMessage>
                          Post has updated.
                        </UpdateSuccessMessage>
                      )}
                    </FormFooter>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default updatePost;
