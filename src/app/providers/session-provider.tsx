'use client'
import { SessionProvider as Provider } from "next-auth/react";
import AuthContextProvider from "@/store/auth/AuthContext";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </Provider>
  );
}
