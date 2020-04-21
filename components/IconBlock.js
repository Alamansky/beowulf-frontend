import Icon from "./Icon";
import Center from "./styles/Center";
import styled from "styled-components";
import InnerBorder from "./styles/InnerBorder";
import OuterBorder from "./styles/OuterBorder";

const IconTitle = styled.h2`
  text-shadow: ${props => props.theme.textShadow};
  white-space: nowrap;
`;

const IconText = styled.p`
  text-shadow: ${props => props.theme.textShadow};
`;

const IconBlock = props => {
  return (
    <OuterBorder style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
      <Center>
        <IconTitle>{props.title}</IconTitle>
        <Icon icon={props.icon} opacity="0.5" />
        <IconText>{props.text}</IconText>
      </Center>
    </OuterBorder>
  );
};

export default IconBlock;
