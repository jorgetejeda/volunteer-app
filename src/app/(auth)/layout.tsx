import { Metadata } from "next";
// Components
import { Container } from "@mui/material";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
};

export default function AuthLayout(props: { children: React.ReactNode }) {
  return <Container maxWidth="lg"> {props.children} </Container>;
}
