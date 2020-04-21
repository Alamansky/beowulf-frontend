import React from "react";
import Icon from "./Icon";
import { theme } from "./Page";

const UpdateSuccessMessage = ({ children }) => {
  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      <Icon icon="check" height="2rem" width="2rem" fill={theme.green}></Icon>
      <p>{children}</p>
    </span>
  );
};

export default UpdateSuccessMessage;
