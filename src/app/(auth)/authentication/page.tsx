'use client'
import React from "react";

import { Container, Box, Button, Typography, Link } from "@mui/material";
import Image from "next/image";

import styled from "@emotion/styled";

const CenteredBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  textAlign: "center",
});

export default function Authentication(){
  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <Container maxWidth="sm">
      <CenteredBox>
        <Image
          src="/assets/Logo_voluntariado.svg"
          alt="Logo"
          width={144}
          height={40}
          priority
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mb: 2 }}
        >
          Iniciar sesión con Microsoft
        </Button>
        <Link href="mailto:soporte@tudominio.com">Contactar a soporte</Link>
      </CenteredBox>
    </Container>
  );
};

