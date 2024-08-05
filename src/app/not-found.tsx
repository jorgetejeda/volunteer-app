"use client";
import styled from "@emotion/styled";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Footer, Header } from "./_components";

const ErrorContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function notFound() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <ErrorContainer>
          <Box maxWidth="532px" textAlign="center">
            <Image
              src="/assets/warning-icon.svg"
              alt="404"
              width={128}
              height={128}
            />
            <Stack spacing={2}>
              <Typography variant="h2" color="primary.main">
                Error 404
              </Typography>
              <Typography variant="h3">
                LO SENTIMOS, NO PUDIMOS ENCONTRAR ESTA PÁGINA
              </Typography>
              <Typography variant="body1">
                La página que estas tratando de acceder no existe o no está
                disponible en este momento, asegúrate de haber escrito bien la
                URL.
              </Typography>
            </Stack>
            <Button variant="contained" color="primary" component="a" href="/">
              Volver al inicio
            </Button>
          </Box>
        </ErrorContainer>
      </Container>

      <Footer />
    </>
  );
}
