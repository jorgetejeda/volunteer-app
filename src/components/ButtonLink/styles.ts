import theme from "@/theme";
import { ButtonVariant } from "./types";

export const LinkButtonStyled = (variant: ButtonVariant) => ({
  fontSize: ".75rem",
  ...(variant == ButtonVariant.Text && {
    color: theme.palette.text.accent,
  }),
  ...(variant == ButtonVariant.Contained && {
    display: "inline-block",
    backgroundColor: theme.palette.primary.highlight,
    color: theme.palette.common.white,
    textDecoration: "none",
    textAlign: "center",
    padding: "8px 16px",
    borderRadius: "5em",
    boxShadow: "none",
    marginTop: "8px",
    lineHeight: "1rem",
    "&:hover": {
      backgroundColor: "darkred",
    },
  }),
});
