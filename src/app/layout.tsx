import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";

// Components
import { Box } from '@mui/material';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
         <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
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
