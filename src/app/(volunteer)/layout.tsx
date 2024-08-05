"use client";
import * as React from "react";
// Components
import { Container } from "@mui/material";
import { Header, Footer } from "@components/index";

export default function EventLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container maxWidth="lg"> {props.children} </Container>
      <Footer />
    </>
  );
}
