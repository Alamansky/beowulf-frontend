import React from "react";
import IconBlock from "./IconBlock";
import styled from "styled-components";
import FeaturesCopy from "./copy/FeaturesCopy";

const FeaturesSection = styled.section`
  display: flex;
  color: white;
  margin-top: 8rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  > * {
    flex: 1;
    margin: 2rem;
  }
`;

const Features = () => {
  const features = FeaturesCopy();
  return (
    <FeaturesSection>
      {features.map((feature) => (
        <IconBlock
          key={feature.icon}
          icon={feature.icon}
          title={feature.title}
          text={feature.text}
        />
      ))}
    </FeaturesSection>
  );
};

export default Features;
