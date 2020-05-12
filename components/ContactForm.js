import UserForm from "./styles/UserForm";
import TextArea from "./styles/TextArea";
import SickButton from "./styles/SickButton";
import SingleAccordionFunctionalChild from "./SingleAccordionFunctionalChild";
import BannerMessage from "./BannerMessage";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import SectionTitle from "./styles/SectionTitle";

import React, { Component } from "react";
import { theme } from "./Page";
import changeAlpha from "../lib/changeAlpha";

import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";

const ContactSection = styled.section`
  width: 100vw;
  margin: 8rem 0;
  padding: 2rem 0;
  background-color: ${(props) => changeAlpha(props.theme.offWhite, 0.8)};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CREATE_MESSAGE = gql`
  mutation CREATE_MESSAGE($email: String!, $message: String!) {
    createMessage(email: $email, message: $message) {
      id
    }
  }
`;

const MessageSent = styled.div`
  position: absolute;
  width: 100%;
  right: 0;
  bottom: 0;
  height: ${(props) => (props.show ? "100%" : "0px")};
  transform-origin: bottom;
  background-color: ${(props) => props.theme.offWhite};
  transition: 0.2s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px solid ${(props) => props.theme.green};
`;

export default class ContactForm extends Component {
  state = {
    email: "",
    message: "",
    messageSent: false,
    _window: false
  };

  componentDidMount() {
    this.setState({ _window: true });
  }

  liftState = (childState) => {
    this.setState({ ...this.state, ...childState });
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  scrollToBottom = () => {
    if (this.state._window) {
      window.setTimeout(() => {
        let contact = document.getElementById("contact");
        contact.style.minHeight = "80vh";
        contact.scrollIntoView(false);
      }, 500);
    }
  };

  closeAccordion = () => {
    if (this.state._window) {
      window.setTimeout(() => {
        let contact = document.getElementById("contact");
        contact.style.minHeight = "0vh";
      }, 200);
    }
  }

  render() {
    let { _window, messageSent, ...messageState } = this.state;
    return (
      <Mutation mutation={CREATE_MESSAGE} variables={messageState}>
        {(createMessage, { error, loading }) => {
          return (
            <ContactSection id="contact">
              <SectionTitle>{this.state.messageSent ? 'Thanks, We\'ll Be in Touch!' : 'Any Questions?'}</SectionTitle>
              <SingleAccordionFunctionalChild
                key={this.state.messageSent}
                singleUse={true}
                button={SickButton}
                buttonActions={this.scrollToBottom}
                buttonText={["Contact Us", "x"]}
                accordionStyle={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "none",
                  border: "none",
                }}
              >
                <UserForm
                  onSubmit={async (e) => {
                    this.closeAccordion();
                    e.preventDefault();
                    const res = await createMessage();
                    this.setState({
                      email: "",
                      message: "",
                      messageSent: true,
                    });
                  }}
                >
                  <fieldset>
                    <TextInput
                      liftState={this.liftState}
                      required={true}
                      title={"email"}
                      type={"email"}
                    />
                    <TextAreaInput
                      liftState={this.liftState}
                      required={true}
                      title={"message"}
                    />
                  </fieldset>
                  <SickButton type="submit" disabled={loading}>
                    Submit
                  </SickButton>
                  {/* <MessageSent show={this.state.messageSent}>
                    <BannerMessage>
                      <h3>Message Sent</h3>
                    </BannerMessage>
                  </MessageSent> */}
                </UserForm>
              </SingleAccordionFunctionalChild>
            </ContactSection>
          );
        }}
      </Mutation>
    );
  }
}
