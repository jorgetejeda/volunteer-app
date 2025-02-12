"use client";
import { Box, Container } from "@mui/material";
import { Footer } from "../Footer";
import { Header } from "../Header";

interface TemplateProps {
  children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "auto",
        }}
      >
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
};
