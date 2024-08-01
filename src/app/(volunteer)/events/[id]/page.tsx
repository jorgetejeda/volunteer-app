"use client";
import React from "react";
import Image from "next/image";
import {
  LocationOnOutlined,
  CalendarMonthOutlined,
  Menu,
} from "@mui/icons-material";
import {
  InformationLabel,
  CategoryLabel,
} from "@components/index";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import theme from "@/theme";

export default function Page({ params }: { params: { id: string } }) {
  
  console.log(params.id);

  return (
    <>
      <Box marginTop={3} marginBottom={2}>
        <Button component="a" href="/events" variant="text">
          Volver a eventos
        </Button>
      </Box>
      <Box
        height={250}
        width="100%"
        position="relative"
        borderRadius={3}
        overflow="hidden"
      >
        <Image
          src={`https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60`}
          alt="test image"
          fill
        />
      </Box>

      <Box marginTop={3} marginBottom={2}>
        <CategoryLabel label="Reforestación" />
        <Typography
          variant="h1"
          marginTop={1}
        >
          Nombre del evento {params.id}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item sm={12} md={7}>
          <Paper sx={{ padding: 2 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="body1">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography variant="body1">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  size="small"
                >
                  Quiero participar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={12} md={5}>
          <Paper sx={{ padding: 2 }}>
            <Box display="flex" flexDirection="column" gap={3}>
              <InformationLabel
                icon={{
                  component: CalendarMonthOutlined,
                  color: theme.palette.primary.main,
                }}
                label="7/2/2021"
              />

              <InformationLabel
                icon={{
                  component: LocationOnOutlined,
                  color: theme.palette.primary.main,
                }}
                label="36 Paramount Drive, Raynham MA 276"
              />

              <InformationLabel
                label="Instrucciones"
                icon={{
                  color: theme.palette.primary.main,
                  component: Menu,
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
