import styled from "styled-components";

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  background: ${(props) =>
    props.backgroundColor ? backgroundColor : props.theme.black};
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  outline: 0;
  border: ${(props) =>
    props.backgroundColor
      ? `2px solid ${backgroundColor}`
      : `2px solid ${props.theme.black}`};
  &:hover {
    background: none;
    cursor: pointer;
  }
  &:hover > * {
    fill: black !important;
  }
`;

export default IconButton;
