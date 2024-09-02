import { typography } from "./typography";
import { palette } from "./palette";
import { AlertProps } from "@mui/material/Alert";

export const components = {
  MuiAlert: {
    styleOverrides: {
      root: ({ ownerState }: { ownerState: AlertProps }) => ({
        ...(ownerState.severity === "info" && {
          backgroundColor: "#60a5fa",
        }),
      }),
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
      sx: {
        borderRadius: 2,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        outline: "none",
        border: "none",
        "& .MuiOutlinedInput-root": {
          backgroundColor: palette.common.white,
          borderRadius: "5em",
          "&:hover fieldset": {
            borderColor: palette.primary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: palette.primary.main,
          },
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        disableRipple: true,
        borderRadius: "5em",
        boxShadow: "none",
        marginTop: "8px",
        fontFamily: typography.fontFamily,
        textTransform: "none",
        "&.MuiButton-contained": {
          color: palette.common.white,
          "&:hover": {
            backgroundColor: "none",
          },
        },
        "&.MuiButton-text": {
          color: palette.primary.main,
          textDecoration: "underline",
          fontFamily: "Open Sans Variable",
          marginTop: "0",
          fontSize: "0.75rem",
        },
        "&:hover": {
          backgroundColor: "none",
          boxShadow: "none",
        },
      },
    },
  },
};
