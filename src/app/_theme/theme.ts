
import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";
import { components } from "./components";
import { palette } from "./palette";

const theme = createTheme({
  palette: {
    ...palette,
    mode: "light", // or "dark" depending on your preference
  },
  typography,
  components: {
    ...components,
    MuiButton: {
      ...components.MuiButton,
      styleOverrides: {
        ...components.MuiButton.styleOverrides,
        root: {
          ...components.MuiButton.styleOverrides.root,
          variants: [], // Add the variants property here
        },
      },
    },
  },
});

export default theme;
