import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Box } from "@mui/material";
import SessionProvider from "./providers/session-provider";
import ThemeProvider from "./providers/theme-provider";

const openSansFont = Open_Sans({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Voluntariado",
    default: "Voluntariado",
  },
  description: "Voluntariado",
};

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSansFont.className}>
        <ThemeProvider>
          <SessionProvider>
            <Box
              sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {props.children}
            </Box>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
