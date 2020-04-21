import React from "react";
import styled from "styled-components";
import changeAlpha from "../lib/changeAlpha";

const FooterElement = styled.footer`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.grey};
  color: ${({ theme }) => changeAlpha(theme.offWhite, 0.5)};
  margin-top: 4rem;
  white-space: nowrap;
  text-align: center;

  > * {
    padding: 4rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;

    > * {
      padding: 0rem;
    }
  }
`;

const Footer = () => {
  return (
    <FooterElement id="footer">
      <p> &copy; Beowulf Beard Company {new Date().getFullYear()}</p>
      <p>Site by Andrew Lamansky</p>
    </FooterElement>
  );
};

export default Footer;
