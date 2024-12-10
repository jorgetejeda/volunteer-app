"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function LogOut() {
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      sessionStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/login"; 
      }, 5000); 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Logging out...</Typography>
      <CircularProgress sx={{ marginTop: 2 }} />
    </Box>
  );
}
