import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:before {
      height: 90%;
      content: "";
      width: 60%;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      transform: translateX(calc(50% - 20%));
    }
    &:hover,
    &:focus {
      outline: none;
      &:before {
        border-bottom: 2px solid black;
        @media (max-width: 700px) {
          border-bottom: none;
        }
      }
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
