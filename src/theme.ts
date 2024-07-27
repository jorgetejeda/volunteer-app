"use client";
import { createTheme } from "@mui/material/styles";
import localFont from "next/font/local";
// Supports weights 300-800
import "@fontsource-variable/open-sans";

const gilroyFont = localFont({
  src: [
    {
      path: "../public/fonts/Gilroy-Regular.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-SemiBold.ttf",
      style: "semi-bold",
    },
  ],
});

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F6F8",
    },
    primary: {
      main: "#00B1CB",
      accent: "#1F6527",
    },
    inverted: {
      main: "#FFFFFF",
      accent: "#F5F6F8",
    },
    grey: {
      50: "#FCFAFE",
      100: "#F6F5F2",
      200: "#A7A9AC",
      300: "#444444",
      400: "#252223",
    },
    text: {
      primary: "#241742",
      secondary: "#444444",
    },
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "5em",
          boxShadow: "none",
          marginTop: "8px",
          fontFamily: gilroyFont.style.fontFamily,
          textTransform: "none",
          "&.MuiButton-contained": {
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "none",
            },
          },
          "&.MuiButton-text": {
            color: "#1F6527",
            textDecoration: "underline",
            fontFamily: "Open Sans Variable",
            marginTop: "0",
            fontSize: "0.75rem",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

theme.typography.h1 = {
  fontFamily: gilroyFont.style.fontFamily,
  fontSize: "2.25rem",
  lineHeight: "2.5rem",
  color: theme.palette.text.primary,
};

theme.typography.h3 = {
  fontFamily: gilroyFont.style.fontFamily,
  color: theme.palette.text.primary,
  fontSize: "1.25rem",
  fontWeight: 500,
  lineHeight: "1.5rem",
};

theme.typography.h4 = {
  fontFamily: gilroyFont.style.fontFamily,
  color: theme.palette.text.primary,
  fontSize: "1rem",
  fontWeight: 700,
  lineHeight: "1.5rem",
};

theme.typography.body1 = {
  fontSize: ".75rem",
  fontFamily: "Open Sans Variable",
  fontWeight: 400,
  lineHeight: "1rem",
  color: theme.palette.text.secondary,
};

theme.typography.caption = {
  fontSize: "0.75rem",
  fontFamily: "Open Sans Variable",
  fontWeight: 400,
  lineHeight: "1rem",
  color: theme.palette.grey[200],
};

export default theme;
