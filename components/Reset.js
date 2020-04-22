import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import PropTypes from "prop-types";
import { CURRENT_USER_QUERY } from "./User";
import TextInput from "./TextInput";
import SickButton from "./styles/SickButton";
import { theme } from "./Page";
import Blurb from "./styles/Blurb";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

export default class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };
  state = {
    password: "",
    confirmPassword: "",
  };

  /*   saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }; */

  liftState = (childState) => {
    this.setState({ ...this.state, ...childState });
  };

  submitForm = async (e, reset) => {
    e.preventDefault();
    const res = await reset();
    this.setState({ password: "", confirmPassword: "" });
  };

  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { loading, error, called }) => {
          return (
            <React.Fragment>
              {!error && called && <Blurb>Your password has been reset.</Blurb>}
              <Form
                method="post"
                onSubmit={(e) => this.submitForm(e, reset)}
                style={{ backgroundColor: theme.lightgrey }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Reset your Password</h2>
                  <Error error={error} />
                  <TextInput
                    liftState={this.liftState}
                    title={"enter new password"}
                    type="password"
                    stateKey="password"
                    value={this.state.password}
                  />
                  {/* <label htmlFor="password">
                  Enter Your New Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label> */}
                  <TextInput
                    liftState={this.liftState}
                    title={"confirm new password"}
                    type="password"
                    stateKey="confirmPassword"
                    value={this.state.confirmPassword}
                  />
                  {/* <label htmlFor="confirmPassword">
                  Confirm Your New Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label> */}
                  <SickButton type="Submit" backgroundColor={theme.red}>
                    Reset
                  </SickButton>
                </fieldset>
              </Form>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}
