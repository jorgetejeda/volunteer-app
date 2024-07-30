"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Open_Sans } from "next/font/google";
import theme from "@/theme";

// Components
import { Box, Container } from "@mui/material";
import { Header, Footer } from "@components/index";
// Css
import AuthContextProvider from "@/store/auth/AuthContext";

const openSansFont = Open_Sans({
  display: "swap",
  subsets: ["latin"],
});

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSansFont.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthContextProvider>
            <Box
              sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Container maxWidth="lg"> {props.children} </Container>
            </Box>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
