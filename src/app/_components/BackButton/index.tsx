import React from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BackButtonProps } from "./types";

export const BackButton: React.FC<BackButtonProps> = ({ linkUrl, buttonLabel }) => {
  const handleGoBack = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!linkUrl) {
      event.preventDefault(); 
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/"; 
      }
    }
  };

  const label = buttonLabel || "Volver";

  return (
    <Button
      sx={{
        paddingLeft: "unset",
      }}
      component="a"
      href={linkUrl || "/"} 
      variant="text"
      startIcon={<ArrowBackIcon />}
      onClick={linkUrl ? undefined : handleGoBack} 
    >
      {label}
    </Button>
  );
};
