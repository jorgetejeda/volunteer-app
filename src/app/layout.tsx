"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Open_Sans } from "next/font/google";
import theme from "@/theme";
import AuthContextProvider from "@/store/auth/AuthContext";
import { Box } from "@mui/material";
import { SessionProvider } from "next-auth/react";

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
          <SessionProvider>
            <AuthContextProvider>
              <Box
                sx={{
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {props.children}
              </Box>
            </AuthContextProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
