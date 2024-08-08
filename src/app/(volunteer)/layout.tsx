"use client";
import * as React from "react";
// Components
import { Container } from "@mui/material";
import { Header, Footer } from "@components/index";
import { useSession } from "next-auth/react";

export default function EventLayout(props: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  React.useLayoutEffect(() => {
    console.log("session", session);
    if (session && session.token && !sessionStorage.getItem("token"))
      sessionStorage.setItem("token", session.token);
  }, [session, status]);

  return (
    <>
      <Header />
      <Container maxWidth="lg"> {props.children} </Container>
      <Footer />
    </>
  );
}
