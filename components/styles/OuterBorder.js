import styled from "styled-components";
import changeAlpha from "../../lib/changeAlpha";

const OuterBorder = styled.div`
  border: 2px solid ${({ theme }) => changeAlpha(theme.offWhite, 0.5)};
  padding: 2rem;
`;

export default OuterBorder;
