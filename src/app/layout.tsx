import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Open_Sans } from 'next/font/google';
import theme from "@/theme";

// Components
import { Box } from "@mui/material";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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
            {props.children}
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
