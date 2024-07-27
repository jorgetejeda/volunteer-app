import React from "react";
import { Button as MuiButton } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(MuiButton)`
`;

export const Button = ({ ...props }) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
