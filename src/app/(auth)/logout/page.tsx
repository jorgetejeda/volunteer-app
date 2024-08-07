"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function LogOut() {
  const router = useRouter();

  const handleLogout = async () => {
    sessionStorage.removeItem('token');
    await signOut({ redirect: true, callbackUrl: "/login" });
  }

  useEffect(() => {
    handleLogout()
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
      <Typography variant="h4">Logging out...</Typography>
      <CircularProgress sx={{ marginTop: 2 }} />
    </Box>
  );
}
