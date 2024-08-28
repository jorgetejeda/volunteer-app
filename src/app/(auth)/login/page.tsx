"use client";
import React, { useCallback, useEffect, useState } from "react";
//@Styles
import theme from "@theme/theme";
import styled from "@emotion/styled";
//Components
import {
  Container,
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
//@Navigation
import { useRouter } from "next/navigation";
//@Providers
import { useAuthContext } from "@/store/auth/AuthContext";
import { signIn } from "next-auth/react";

const CenteredBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  textAlign: "center",
});

const MicrosoftButton = styled(Button)({
  backgroundColor: "#fff",
  border: "2px solid #e2e8f0",
  padding: "1rem",
  borderRadius: "2rem",
  "&.MuiButton-contained": {
    color: "#1E293B",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export default function LogIn() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);
      await signIn("azure-ad", { callbackUrl: "/" });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <CenteredBox>
        <Image
          src="/assets/Logo_voluntariado.svg"
          alt="Logo"
          width={214}
          height={64}
          priority
        />
        <Box marginTop={8}>
          <Stack spacing={2}>
            <MicrosoftButton
              onClick={() => handleLogin()}
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Iniciar Sesión"}
            </MicrosoftButton>

            <Stack spacing={1} direction="row">
              <Typography variant="body1" color={theme.palette.text.primary}>
                ¿No puedes iniciar sesión?
              </Typography>
              <Box
                component="a"
                href="mailto:soporte@tudominio.com"
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                Contactar a soporte
              </Box>
            </Stack>
          </Stack>
        </Box>
      </CenteredBox>
    </Container>
  );
}
