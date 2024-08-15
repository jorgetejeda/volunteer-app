"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import theme from "@/theme";

export default function AuthErrorPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Extract the error message from the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    setErrorMessage(error || "Ha ocurrido un error inesperado. Por favor, intenta nuevamente.");
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
        backgroundColor: theme.palette.background.default,
        padding: 2,
      }}
    >
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" color={theme.palette.error.main} gutterBottom>
          ¡Oops! Algo salió mal
        </Typography>
        <Typography variant="body1" color={theme.palette.text.primary} paragraph>
          {errorMessage}
        </Typography>
        <Typography variant="body2" color={theme.palette.text.secondary} paragraph>
          Si el problema persiste, por favor contacta al soporte técnico o intenta nuevamente más tarde.
        </Typography>
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Volver a la página principal
        </Button>
      </Paper>
    </Box>
  );
}
