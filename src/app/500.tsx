import { Container, Stack, Typography } from "@mui/material";

export default function Custom500() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Typography variant="h2" align="center" color="main">
          Error 505
        </Typography>
        <Typography variant="h3" align="center">
          LO SENTIMOS, NO PUDIMOS ENCONTRAR ESTA PÁGINA
        </Typography>
        <Typography variant="body1" align="center">
          La página que estas tratando de acceder no existe o no está disponible
          en este momento, asegúrate de haber escrito bien la URL.
        </Typography>
      </Stack>
    </Container>
  );
}
