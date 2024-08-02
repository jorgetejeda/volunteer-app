"use client";
import React, { useEffect } from "react";

import { Container, Box, Button, Typography, Stack } from "@mui/material";
import Image from "next/image";

import styled from "@emotion/styled";
import httpImplementation from "@/core-libraries/http/http.implementation";
import { User, UserCredentials } from "@/core/types/user";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { useRouter } from "next/navigation";

import theme from "@/theme";
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

export default function Authentication() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    try {
      login({ email: "jorgetejeda0804@gmail.com", password: "Teje3000" });
      //signIn("azure-ad")
    } catch (error) {
      console.log(error);
    }
  };

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
            <MicrosoftButton onClick={handleLogin} variant="contained">
              Iniciar Sesión
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
