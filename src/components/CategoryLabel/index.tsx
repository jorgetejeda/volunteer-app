import React from "react";
import { Chip, ChipProps, Theme } from "@mui/material";
import { styled } from "@mui/system";

const StyledCategoryLabel = styled(Chip)<{
  textColor?: string;
  backgroundColor?: string;
}>(({ theme, textColor, backgroundColor }) => ({
  backgroundColor: backgroundColor || theme.palette.primary.main,
  color: textColor || theme.palette.common.white,
  padding: "8px 4px",
  "& .MuiChip-label": {
    fontSize: "0.625rem",
    color: textColor || theme.palette.common.white,
  },
}));

type CategoryLabelProps = {
  label: string;
  textColor?: string;
  backgroundColor?: string;
} & ChipProps;

export const CategoryLabel = ({
  label,
  textColor,
  backgroundColor,
  size = "small",
  ...otherProps
}: CategoryLabelProps) => {
  return (
    <StyledCategoryLabel
      label={label}
      textColor={textColor}
      size={size}
      backgroundColor={backgroundColor}
      {...otherProps}
    />
  );
};

export default CategoryLabel;
