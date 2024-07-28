"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Open_Sans } from "next/font/google";
import theme from "@/theme";

// Components
import { Box, Container } from "@mui/material";
import { Header, Footer } from "@components/index";
// css
import "../styles/globals.css";
const openSansFont = Open_Sans({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSansFont.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header />
            <Container maxWidth="lg"> {props.children} </Container>
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
