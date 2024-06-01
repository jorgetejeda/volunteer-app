"use client";
import { createTheme } from "@mui/material/styles";
import localFont from "next/font/local";
    
const gilroyFont = localFont({
  src: [
    {
      path: '../public/fonts/Gilroy-Regular.ttf',
      style: 'normal',
    },
    {
      path: '../public/fonts/Gilroy-SemiBold.ttf',
      style: 'semi-bold',
    },
  ]
});

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F6F8",
    },
    primary: {
      main: "#24A49E",
      accent: "1F6527",
      highlight: "#00B1CB",
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
      accent: "#1F6527",
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
  fontFamily: gilroyFont.style.fontFamily,  
  fontSize: "2.25rem",
  lineHeight: '2.5rem',
};

theme.typography.h3 = {
  fontFamily: gilroyFont.style.fontFamily,  
  color: theme.palette.text.primary,
  fontSize: "1.25rem",
  fontWeight: 500,
  lineHeight: '1.5rem',
};

theme.typography.h4 = {
  fontFamily: gilroyFont.style.fontFamily,  
  color: theme.palette.text.primary,
  fontSize: "1rem",
  fontWeight: 700,
  lineHeight: "1.5rem",
};

theme.typography.body1 = {
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: '1.5rem',
  color: theme.palette.text.secondary,
};

theme.typography.caption = {
  fontSize: "0.75rem",
  fontWeight: 400,
  lineHeight: '1rem',
  color: theme.palette.grey[200],
};

export default theme;
