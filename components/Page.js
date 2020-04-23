import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "../components/Header";
import Meta from "../components/Meta";
import trimSVGElements from "../lib/trimSVGElements";
import Footer from "../components/Footer";

const theme = {
  red: "rgba(255,0,0,1.0)",
  redHex: "#FF0000",
  green: "rgba(0,204,0,1.0)",
  greenHex: "#00CC00",
  greenRGB: "0,204,0",
  black: "rgba(57,57,57,1.0)",
  blackHex: "#393939",
  grey: "rgba(58,58,58,1.0)",
  greyHex: "#3A3A3A",
  lightgrey: "rgba(225,225,225,1.0)",
  lightgreyHex: "#E1E1E1",
  offWhite: "rgba(237,237,237,1.0)",
  offWhiteHex: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  textShadow: "2px 2px 5px #393939",
};

const StyledPage = styled.div`
  color: ${(props) => props.theme.black};
  /* corrects overflow */
  overflow: hidden;
  max-width: 100vw;
  min-height: 100vh;
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  margin-top: 207px;

  @media (max-width: 768px) {
    margin-top: 111px;
  }
  @media (max-width: 700px) {
    margin-top: 91px;
  }
`;

const GlobalStyle = createGlobalStyle`
/* @font-face {
    font-family: 'Lora';
    src: url('/static/Lora-Regular.ttf')
    format('woff2');
    font-weight: normal;
    font-style: normal;
} */
    html {
        box-sizing: border-box;
        font-size: 10px;
        scroll-behavior: smooth;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        font-family: 'Lora', serif;
    }
   /*  h2 {
      font-size: 7rem;
    }
    h3 {
      font-size: 5rem;
    } */
    a {
        text-decoration: none;
        color: ${theme.black};
    }
    button {
      font-family: 'Lora', serif;
    }
`;

export default class Page extends Component {
  /*   componentDidMount() {
    trimSVGElements();
  } */

  render() {
    const fullWidthPages = ["/", "/orders"];
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledPage>
          <Meta></Meta>
          <Header></Header>
          {fullWidthPages.includes(this.props.page) ? (
            this.props.children
          ) : (
            <Inner>{this.props.children}</Inner>
          )}
        </StyledPage>
        <Footer />
      </ThemeProvider>
    );
  }
}

export { theme };
