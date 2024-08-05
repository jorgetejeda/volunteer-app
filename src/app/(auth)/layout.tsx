"use client";
import * as React from "react";
// Components
import { Container } from "@mui/material";

export default function AuthLayout(props: { children: React.ReactNode }) {
  return <Container maxWidth="lg"> {props.children} </Container>;
}
