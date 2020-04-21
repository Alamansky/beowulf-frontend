import Nav from "./Nav";
import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import Cart from "./Cart";
import Search from "./Search";
import env from "../env.json";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  a {
    padding: 0.5rem 1rem;
    color: ${(props) => props.theme.black};
    text-transform: uppercase;
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  /* stick header */
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  background-color: white;
  .bar {
    border-bottom: 20px solid ${(props) => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 10px solid ${(props) => props.theme.lightgrey};

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a href="">{env.siteTitle}</a>
        </Link>
      </Logo>
      <Nav></Nav>
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <Cart></Cart>
  </StyledHeader>
);

export default Header;
