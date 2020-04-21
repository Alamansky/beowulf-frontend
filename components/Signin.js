import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import { theme } from "./Page";
import TextInput from "./TextInput";
import SickButton from "./styles/SickButton";

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export default class Signin extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  liftState = (childState) => {
    this.setState({ ...this.state, ...childState });
  };

  submitForm = async (e, signin) => {
    e.preventDefault();
    const res = await signin();
    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { loading, error }) => {
          return (
            <Form
              method="post"
              onSubmit={(e) => this.submitForm(e, signin)}
              style={{ backgroundColor: theme.lightgrey }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign in to your Admin Account</h2>
                <Error error={error} />
                <TextInput
                  liftState={this.liftState}
                  required={true}
                  title={"email"}
                />
                <TextInput
                  liftState={this.liftState}
                  required={true}
                  title={"password"}
                  type={"password"}
                />
                <SickButton type="Submit" backgroundColor={theme.red}>
                  Sign in
                </SickButton>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}
