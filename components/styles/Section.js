import styled from "styled-components";

const Section = styled.section`
  background: ${(props) => props.backgroundColor || props.theme.offWhite};
  width: 100vw;
`;

export default Section;
