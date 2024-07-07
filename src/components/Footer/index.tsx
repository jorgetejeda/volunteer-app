"use client";
import React from "react";
import Image from "next/image";
import { Grid, Box, Typography, Container } from "@mui/material";
import theme from "@/theme";
// Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: "auto" }}>
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
            <Image
              src="/assets/logo-footer.png"
              alt="Logo"
              width={184}
              height={24}
              priority
            />
            <Grid
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              <Typography variant="caption">
                Siguenos en nuestras redes sociales
              </Typography>
              <FacebookIcon sx={{ color: theme.palette.grey[200] }} />
              <InstagramIcon sx={{ color: theme.palette.grey[200] }} />
              <TwitterIcon sx={{ color: theme.palette.grey[200] }} />
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
          <Typography variant="caption" color={theme.palette.inverted.main}>
            ©2024. Todos los derechos reservados
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
