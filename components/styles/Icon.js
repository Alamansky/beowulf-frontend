import styled from "styled-components";

const Icon = styled.button`
  display: flex;
  justify-content: center;
  background: black;
  opacity: 0.8;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  outline: 0;
  border: 2px solid black;
  &:hover {
    background: none;
    color: black;
    cursor: pointer;
  }
`;

export default Icon;
