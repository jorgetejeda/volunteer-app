"use client";
import * as React from "react";
import { Grid, Icon, Paper, Box, Typography, Container } from "@mui/material";
import theme from "@/theme";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Container maxWidth="lg">
        <Box component="header" sx={{ marginTop: 4, marginBottom: 3 }}>
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              borderRadius: 2,
            }}
          >
            asdf
          </Paper>
        </Box>
      </Container>

      {/* Main */}
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            md={8}
            sm={12}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Box>
              <Typography variant="h3">Bienvenido, usuario!</Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={7} sm={12}>
                <Paper elevation={0} sx={{ padding: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={2}
                  >
                    <Typography variant="h3">Proximos eventos</Typography>
                    <Link href="/events" style={{ fontSize: "12px" }}>
                      Ver todos
                    </Link>
                  </Box>

                  <Box display="flex" gap={2} flexDirection="column">
                    {[...Array(2)].map((_, index) => (
                      <Box
                        key={index}
                        padding={2}
                        borderRadius={2}
                        display="flex"
                        gap={2}
                        flexDirection="column"
                        sx={{ background: theme.palette.grey[100] }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <Icon
                            className="fas fa-calendar-alt"
                            fontSize="small"
                          />
                          <Typography variant="caption">7/2/2021</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h4">
                            Nombre del evento #{index + 1}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">
                            Jorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc vulputate libero et velit interdum, ac
                            aliquet odio mattis.
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Icon
                            className="fas fa-map-marker-alt"
                            fontSize="small"
                          />
                          <Typography variant="caption">
                            36 Paramount Drive, Raynham MA 2767
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
              <Grid item md={5} sm={12}>
                <Paper elevation={0} sx={{ padding: 2 }}>
                  <Typography variant="body1">Horas Acumuladas</Typography>
                  <Typography variant="h1">120</Typography>
                </Paper>

                <Paper elevation={0} sx={{ padding: 2, marginTop: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={2}
                  >
                    <Typography variant="h3">Galeria</Typography>
                    <Link href="/events" style={{ fontSize: "12px" }}>
                      Ver todas las imagenes
                    </Link>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/* Calendar */}
          <Grid item md={4} sm={12}>
            <Paper elevation={0} sx={{ padding: 2 }}>
              <Typography variant="h3">Calendario</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: "auto",
        }}
      >
        <Box
          paddingY={2}
          marginTop={2}
          sx={{ background: theme.palette.common.white }}
        >
          <Container maxWidth="lg">
            <Grid
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                My sticky footer can be found here.
              </Typography>
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <Typography variant="caption">
                  Siguenos en nuestras redes sociales
                </Typography>
                <Icon className="fab fa-square-facebook" fontSize="small" />
                <Icon className="fab fa-instagram" fontSize="small" />
                <Icon className="fab fa-twitter" fontSize="small" />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
            py: 2,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="caption">
              ©2024. Todos los derechos reservados
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
