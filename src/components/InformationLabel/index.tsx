import React from "react";
import { Box, Typography } from "@mui/material";
import { InformationLabelProps } from "./types";
import theme from "@/theme";

export const InformationLabel = ({ icon, label }: InformationLabelProps) => {
  const {
    component: Icon,
    color = theme.palette.grey[200],
    size = "small",
  } = icon;
  return (
    <Box display="flex" alignItems="end" gap={1}>
      <Icon fontSize={size} sx={{ color }} />
      <Typography variant="caption">{label}</Typography>
    </Box>
  );
};
