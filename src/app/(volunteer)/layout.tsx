import * as React from "react";
import { Metadata } from "next";
// Components
import { Template } from "../_components";

export const metadata: Metadata = {
  title: "Bienvenidos a Eventos",
};

export default function EventLayout(props: { children: React.ReactNode }) {
  return <Template>{props.children}</Template>;
}
