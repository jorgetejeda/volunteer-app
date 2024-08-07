"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function LogOut() {
  const router = useRouter();

  useEffect(() => {
    // Trigger sign-out
    signOut({ redirect: false }).then(() => {
      // Redirect to home or a specific page after sign-out
      router.push("/");
    });
  }, [router]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
      <Typography variant="h4">loging out...</Typography>
      <CircularProgress sx={{ marginTop: 2 }} />
    </Box>
  );
}
