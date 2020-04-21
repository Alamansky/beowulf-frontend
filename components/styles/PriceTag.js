import styled from "styled-components";

const PriceTag = styled.span`
  background: ${(props) => props.theme.grey};
  clip-path: polygon(10% 0, 100% 1%, 100% 100%, 10% 100%, 0% 50%);
  color: white;
  padding: 2rem;
  line-height: 1;
  display: inline-block;
  box-shadow: ${(props) => props.theme.bs};
  position: relative;
`;

export default PriceTag;
