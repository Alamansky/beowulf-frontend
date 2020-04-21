import styled from "styled-components";
import AboutCopy from "./copy/AboutCopy";
import changeAlpha from "../lib/changeAlpha";
import env from "../env.json";
import addUrlParam from "../lib/addUrlParam";
import getCSSBackgroundImage from "../lib/getCSSBackgroundImage";

const AboutSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  width: 100vw;
  min-height: 50rem;
  background-image: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-origin: border-box;
  background-position-x: 25%;

  @media (max-width: 1300px) {
    background-position-x: 0;
  }

  /* hack class applies to absolutely-positioned anchor to account for offset of fixed header*/
  .hack {
    position: absolute;
    top: -200px;
  }
`;

const AboutText = styled.div`
  background-color: ${(props) => props.theme.grey};
  color: ${(props) => props.theme.offWhite};
  padding: 4rem 6rem;
  position: relative;
  width: 50%;
  transition: 0.5s ease;
  outline: 2px solid ${({ theme }) => changeAlpha(theme.offWhite, 0.5)};
  outline-offset: -30px;
  line-height: 3;

  @media (max-width: 1300px) {
    width: 100%;
    opacity: 0.95;
  }

  h2 {
    text-align: center;
    font-size: 7rem;

    @media (max-width: 768px) {
      font-size: 4rem;
    }
  }
`;

import React, { Component } from "react";

export default class About extends Component {
  state = {
    _window: false,
    width: "",
  };

  componentDidMount() {
    this.setState({
      _window: true,
      width: window.innerWidth * window.devicePixelRatio,
    });
  }

  /*   getCSSBackgroundImage({ url, screenWidth }) {
    let width = screenWidth > 1000 ? screenWidth : 1000;
    return addUrlParam({
      url,
      replace: "upload",
      replaceWith: `upload/c_scale,w_${width}`,
    });
  } */

  render() {
    return (
      <AboutSection
        image={getCSSBackgroundImage({
          url: env.aboutImage,
          screenWidth: this.state.width,
        })}
      >
        <span id="about" className="hack"></span>
        <AboutText>
          <AboutCopy />
        </AboutText>
      </AboutSection>
    );
  }
}

/* const About = () => (
  <AboutSection>
    <span id="about" className="hack"></span>
    <AboutText>
      <AboutCopy />
    </AboutText>
  </AboutSection>
);

export default About;
 */
