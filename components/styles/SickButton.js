import styled from "styled-components";
import { propOrDefault as pod } from "../../lib/propOrDefault";
// pod = prop or default

const SickButton = styled.button`
  background: ${(props) => pod(props.backgroundColor, props.theme.black)};
  color: ${(props) => props.theme.offWhite};
  font-weight: 500;
  border: 2px solid ${(props) => pod(props.backgroundColor, props.theme.black)};
  outline: 0;
  color: ${(props) => props.theme.offWhite};
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2.5rem;
  padding: 0.8rem 1.5rem;
  margin-right: 1rem;
  display: inline-block;
  transition: all 0.2s;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  &[disabled] {
    opacity: 0.5;
    cursor: wait;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    color: ${(props) => pod(props.backgroundColor, props.theme.black)};
    cursor: pointer;
  }
`;

export default SickButton;
