import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import { logErr } from "@alamansky/logathon";

function addUrlParam({ url, replace, replaceWith }) {
  return url.replace(replace, replaceWith);
}

const ImageElement = styled.img`
  width: 100%;
  min-height: ${(props) => (props.error ? "50vh" : null)};
`;

const FeaturedImage = ({
  imageUrl,
  maxWidth = "1000px",
  sizes,
  breakpoints,
  className,
}) => {
  sizes = sizes || ` 100vw, (min-width: ${maxWidth}) ${maxWidth}`;
  breakpoints = breakpoints || [
    1350,
    1200,
    1050,
    1000,
    850,
    600,
    450,
    300,
    150,
  ];
  let imageSizes = breakpoints.map((breakpoint) => {
    return addUrlParam({
      url: imageUrl,
      replace: "upload",
      replaceWith: `upload/c_scale,w_${breakpoint}`,
    });
  });
  return (
    <ImageElement
      src={imageUrl} // 1500w
      srcSet={imageSizes
        .map((img, i) => `${img} ${breakpoints[i]}w`)
        .join(", ")}
      sizes={sizes}
      className={className}
    />
  );
};

FeaturedImage.propTypes = {
  imageSizes: PropTypes.array,
  maxWidth: PropTypes.string,
};

export default FeaturedImage;

/* srcSet={`${imageSizes[1]} ${breakpoints[1]}w,
               ${imageSizes[2]} ${breakpoints[2]}w,
               ${imageSizes[3]} ${breakpoints[3]}w,
               ${imageSizes[4]} ${breakpoints[4]}w,
               ${imageSizes[5]} ${breakpoints[5]}w,
               ${imageSizes[6]} ${breakpoints[6]}w,
               ${imageSizes[7]} ${breakpoints[7]}w,
               ${imageSizes[8]} ${breakpoints[8]}w,
               ${imageSizes[9]} ${breakpoints[9]}w,
               `} */
