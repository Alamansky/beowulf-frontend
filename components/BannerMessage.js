import React from "react";
import styled from "styled-components";
import changeAlpha from "../lib/changeAlpha";
import Icon from "./Icon";

const Banner = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.offWhite};
  padding: 4rem;
  text-shadow: ${(props) => props.theme.textShadow};
`;

const BannerText = styled.span`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  border: 2px solid;
  /* border-color: ${(props) => props.theme.green}; */
  background-color: ${(props) => props.theme.grey};
  padding: 0 2rem;
  position: relative;
`;

const BannerMessage = (props) => {
  return (
    <Banner>
      <BannerText>
        <Icon icon="check" height="25px" width="25px" fill="white"></Icon>
        <span>{props.children}</span>
      </BannerText>
    </Banner>
  );
};

export default BannerMessage;
