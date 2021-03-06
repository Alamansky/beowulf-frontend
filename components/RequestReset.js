import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import TextInput from "./TextInput";
import SickButton from "./styles/SickButton";
import { theme } from "./Page";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export default class RequestReset extends Component {
  state = {
    email: "",
  };

  /*   saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  }; */

  liftState = (childState) => {
    this.setState({ ...this.state, ...childState });
  };

  submitForm = async (e, reset) => {
    e.preventDefault();
    const res = await reset();
    this.setState({ email: "" });
  };

  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { loading, error, called }) => {
          return (
            <Form
              method="post"
              onSubmit={(e) => this.submitForm(e, reset)}
              style={{ backgroundColor: theme.lightgrey }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request a password reset</h2>
                <Error error={error} />
                {!error && !loading && called && (
                  <p>Success! Check your email for a reset link</p>
                )}
                {/* <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label> */}
                <TextInput
                  liftState={this.liftState}
                  title={"email"}
                  value={this.state.email}
                />
              </fieldset>
              <SickButton
                type="Submit"
                backgroundColor={theme.red}
                className="button--bottom"
              >
                Request Reset
              </SickButton>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}
