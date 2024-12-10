import localFont from "next/font/local";
// Supports weights 300-800
import "@fontsource-variable/open-sans";

const gilroyFont = localFont({
  src: [
    {
      path: "../../../public/fonts/Gilroy-Regular.ttf",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Gilroy-SemiBold.ttf",
      style: "semi-bold",
    },
  ],
});

export const typography = {
  fontFamily: gilroyFont.style.fontFamily,
  h1: {
    fontFamily: gilroyFont.style.fontFamily,
    fontSize: "2.25rem",
    lineHeight: "2.5rem",
    color: "#241742", // Ajuste a la paleta de colores
  },
  h3: {
    fontFamily: gilroyFont.style.fontFamily,
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: "1.5rem",
    color: "#241742",
  },
  h4: {
    fontFamily: gilroyFont.style.fontFamily,
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: "1.5rem",
    color: "#241742",
  },
  body1: {
    fontSize: ".75rem",
    fontFamily: "Open Sans Variable",
    fontWeight: 400,
    lineHeight: "1rem",
    color: "#444444", // Ajuste a la paleta de colores
  },
  caption: {
    fontSize: "0.75rem",
    fontFamily: "Open Sans Variable",
    fontWeight: 400,
    lineHeight: "1rem",
    color: "#A7A9AC", // Ajuste a la paleta de colores
  },
};
