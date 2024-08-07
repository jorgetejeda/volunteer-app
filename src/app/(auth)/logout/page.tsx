"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function LogOut() {
  const router = useRouter();

  useEffect(() => {
    console.log("Removing token from sessionStorage");
    sessionStorage.removeItem('token');

    // Adding a small delay before redirecting
    setTimeout(() => {
      signOut({ redirect: false }).then(() => {
        console.log("Redirecting to homepage");
        router.push("/");
      });
    }, 1000); // Adjust delay as needed
  }, [router]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
      <Typography variant="h4">Logging out...</Typography>
      <CircularProgress sx={{ marginTop: 2 }} />
    </Box>
  );
}
