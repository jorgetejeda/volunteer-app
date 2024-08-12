"use client";
import * as React from "react";
import { Box, Container } from "@mui/material";
import { Header, Footer } from "@components/index";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function EventLayout(props: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const getInformation = async () => {
    try {
      if (!session || !session.email || !session.name) {
        throw new Error("Invalid session data");
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_AUTH_API}/login`,
        {
          email: session.email,
          name: session.name,
          authToken: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET as string,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data:", data);

      if (!data.isSucceeded) {
        throw new Error("Error logging in");
      }

      sessionStorage.setItem("token", data.data.token);
      sessionStorage.setItem("role", data.data.userRoles[0].role.title);

        // React.useLayoutEffect(() => {
  //   if (session && session.token && !sessionStorage.getItem("token"))
  //     sessionStorage.setItem("token", session.token);
  // }, [session, status]);


      // Store the token and role in session storage (or other storage if needed)
      // sessionStorage.setItem("userToken", data.data.token);
      // sessionStorage.setItem("userRole", data.data.userRoles[0].role.title);

      // console.log("User Token:", data.data.token);
      // console.log("User Role:", data.data.userRoles[0].role.title);
    } catch (error) {
      console.error("Error fetching information:", error);
    }
  };

  React.useEffect(() => {
    if (status === "authenticated" && session) {
      getInformation();
    }
  }, [status, session]);

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
}
