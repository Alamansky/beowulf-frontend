import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import TextInput from "./TextInput";
import { theme } from "./Page";
import SickButton from "./styles/SickButton";

const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export default class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  liftState = (childState) => {
    this.setState({ ...this.state, ...childState });
  };

  submitForm = async (e, signup) => {
    e.preventDefault();
    const res = await signup();
    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { loading, error }) => {
          return (
            <Form
              method="post"
              onSubmit={(e) => this.submitForm(e, signup)}
              style={{ backgroundColor: theme.lightgrey }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Create New Admin Account</h2>
                <Error error={error} />
                <TextInput
                  liftState={this.liftState}
                  required={true}
                  title={"email"}
                />
                <TextInput
                  liftState={this.liftState}
                  required={true}
                  title={"name"}
                />
                <TextInput
                  liftState={this.liftState}
                  required={true}
                  title={"password"}
                  type={"password"}
                />
              </fieldset>
              <SickButton
                type="Submit"
                backgroundColor={theme.red}
                className="button--bottom"
              >
                Create Account
              </SickButton>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}
