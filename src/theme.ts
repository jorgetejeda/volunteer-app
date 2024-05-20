"use client";
import { Open_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F6F8",
    },
    primary: {
      main: "#24A49E",
    },
    grey: {
      100: "#F6F5F2",
      200: "#A7A9AC",
      300: "#444444",
      400: "#252223",
    },
    text: {
      primary: "#252223",
      secondary: "#444444",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif, Gilroy",
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

theme.typography.h1 = {
  fontSize: "2.25rem",
};

theme.typography.h3 = {
  fontFamily: "Gilroy, sans-serif", // 'Gilroy, sans-serif
  color: theme.palette.text.primary,
  fontSize: "1.25rem",
  fontWeight: 700,
  lineHeight: 1.2,
};

theme.typography.h4 = {
  fontFamily: "Gilroy, sans-serif", // 'Gilroy, sans-serif
  color: theme.palette.text.primary,
  fontSize: "1rem",
  fontWeight: 700,
  lineHeight: 1.2,
};

theme.typography.body1 = {
  fontFamily: "Open sans, sans-serif",
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: 1.5,
};

export default theme;
