import styled from "styled-components";
import changeAlpha from "../../lib/changeAlpha";

const ClickableText = styled.p`
  text-decoration: underline;
  color: ${({ theme, mode }) => (mode == "dark" ? theme.grey : theme.offWhite)};
  cursor: pointer;
  &:hover {
    color: ${({ theme, mode }) =>
      mode == "dark"
        ? changeAlpha(theme.grey, 0.5)
        : changeAlpha(theme.offWhite, 0.5)};
  }
`;

export default ClickableText;
