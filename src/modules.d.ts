// modules.d.ts

declare module "react-render-html" {
  import { ReactNode } from "react";

  // Define the types for the function and its parameters
  export default function renderHtml(html: string): ReactNode;
}
