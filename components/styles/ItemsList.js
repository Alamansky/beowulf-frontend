import styled from "styled-components";

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  color: ${props => props.theme.black};
  @media (max-width: 756px) {
    grid-template-columns: 1fr;
  }
`;

export default ItemsList;
