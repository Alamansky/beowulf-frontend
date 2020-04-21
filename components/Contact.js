import React, { Component } from "react";
import Center from "./styles/Center";
import ClickableText from "./styles/ClickableText";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import OuterBorder from "./styles/OuterBorder";
import InnerBorder from "./styles/InnerBorder";
import SickButton from "./styles/SickButton";

const GET_ADMIN_EMAIL = gql`
  query GET_ADMIN_EMAIL {
    adminEmail {
      someString
    }
  }
`;

export default class Contact extends Component {
  state = {
    showEmail: false,
    _window: false
  };

  componentDidMount() {
    this.setState({ _window: true });
  }

  handleClick = email => {
    this.setState({ showEmail: true });
    //const document = document || null;
    if (this.state._window) {
      navigator.clipboard.writeText(email);
    }
  };
  render() {
    return (
      <Query query={GET_ADMIN_EMAIL}>
        {({ data, loading, error }) => {
          return (
            <Center style={{ margin: "15rem" }} id="contact">
              <ClickableText
                onClick={() => this.handleClick(data.adminEmail.someString)}
              >
                <InnerBorder>
                  {this.state.showEmail
                    ? error
                      ? "Houston, we have an error"
                      : data.adminEmail.someString
                    : "Got questions?"}
                </InnerBorder>
              </ClickableText>
              {this.state.showEmail && (
                <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  {"(copied to clipboard)"}
                </p>
              )}
            </Center>
          );
        }}
      </Query>
    );
  }
}
