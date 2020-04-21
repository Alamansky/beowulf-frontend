import styled, { keyframes } from "styled-components";
//import { theme } from "../Page";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  /*box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);*/
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 2s forwards ease;
  /* text-shadow: ${(props) => props.theme.textShadow}; */
  background: rgba(255, 255, 255, 0.5);
  /* color: rgba(255, 255, 255, 1); */
  border: 2px solid rgba(255, 255, 255, 0.5);
  margin: 2rem;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  opacity: 0;

  @keyframes fadeIn {
    100% {
      opacity: 1;
    }
  }

  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.5rem;
    border: 1px solid black;
    background: rgba(255, 255, 255, 0.7);
    &:focus {
      outline: 0;
      border-color: ${(props) => props.theme.red};
    }
  }
  /*   button,
  input[type="submit"] {
    width: auto;
    background: red;
    color: white;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  } */
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
