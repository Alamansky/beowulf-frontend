import { Query } from "react-apollo";
import gql from "graphql-tag";
import propTypes from "prop-types";
import React, { Component } from "react";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      permissions
      cart {
        id
        quantity
        item {
          id
          title
          price
          image
          description
        }
      }
    }
  }
`;

class User extends Component {
  state = {
    _window: false,
  };

  componentDidMount() {
    this.setState({ _window: true });
  }

  killPoll = (stopPolling) => {
    stopPolling();
  };

  setTimer = (stopPolling) => {
    if (this.state._window) {
      window.setTimeout(() => this.killPoll(stopPolling), 250);
    }
  };
  render() {
    return (
      <Query {...this.props} query={CURRENT_USER_QUERY} pollInterval={100}>
        {(payload) => {
          let stopPolling = payload.stopPolling;
          this.state._window && this.setTimer(stopPolling);
          return this.props.children(payload);
        }}
      </Query>
    );
  }
}

User.propTypes = {
  children: propTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
