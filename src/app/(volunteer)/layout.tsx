"use client";
import * as React from "react";
// Components
import { Box, Container } from "@mui/material";
import { Header, Footer } from "@components/index";
import { useSession } from "next-auth/react";

export default function EventLayout(props: { children: React.ReactNode }) {
  // const { data: session, status } = useSession();

  // React.useLayoutEffect(() => {
  //   if (session && session.token && !sessionStorage.getItem("token"))
  //     sessionStorage.setItem("token", session.token);
  // }, [session, status]);

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
          flex: 'auto',
        }}
      >
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
}
