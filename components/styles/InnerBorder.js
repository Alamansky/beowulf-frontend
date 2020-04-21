import styled from "styled-components";
import changeAlpha from "../../lib/changeAlpha";

const InnerBorder = styled.span`
  outline: 2px solid ${({ theme }) => changeAlpha(theme.offWhite, 0.5)};
  outline-offset: -30px;
  padding: 4rem 6rem;
`;

export default InnerBorder;
