import React, { Component } from "react";
import styled from "styled-components";
import Center from "./styles/Center";
import env from "../env.json";
import addUrlParam from "../lib/addUrlParam";
import getCSSBackgroundImage from "../lib/getCSSBackgroundImage";

const HeroSpacer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const HeroImage = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  z-index: -2;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /*   background: linear-gradient(
    179deg,
    rgb(240, 236, 231) 0%,
    rgb(249, 244, 239) 40%,
    rgb(121, 125, 121) 57%,
    rgb(55, 60, 67) 60%,
    rgb(27, 30, 37) 100%
  ); */
  background-image: ${(props) => `url(${props.image}), ${props.gradient}`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const HeroText = styled.h1`
  margin-top: 60vh;
  position: relative;
  color: ${(props) => props.theme.offWhite};
  mix-blend-mode: screen;
`;

export default class Hero extends Component {
  _isMounted = false;
  state = {
    _window: false,
    scroll: 0,
    width: "",
  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ _window: true, width: window.innerWidth });
      window.addEventListener("scroll", this.handle);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("scroll", this.handle, true);
  }

  handle = () => {
    this.state._window && this.setState({ scroll: window.scrollY });
  };

  render() {
    const gradient = `linear-gradient(
      179deg,
      rgb(240, 236, 231) 0%,
      rgb(249, 244, 239) 40%,
      rgb(121, 125, 121) 57%,
      rgb(55, 60, 67) 60%,
      rgb(27, 30, 37) 100%
    )`;
    return (
      <HeroSpacer>
        <HeroImage
          image={getCSSBackgroundImage({
            url: env.heroImage,
            screenWidth: this.state.width,
          })}
          gradient={gradient}
        >
          <Center>
            <HeroText
              id="hero-text"
              style={{
                transform: `translateY(calc(-${this.state.scroll}rem / 10))`,
                letterSpacing: `calc(${this.state.scroll}px / 50)`,
              }}
            >
              Some Tagline Here
            </HeroText>
          </Center>
        </HeroImage>
      </HeroSpacer>
    );
  }
}
