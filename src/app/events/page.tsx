"use client";
import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import { CardEvent } from "@/components";
import { ButtonVariant } from "@/components/ButtonLink/types";

export default function EventPage() {
  const events = Array(10)
    .fill(null)
    .map((_, index) => ({
      name: `Nombre del evento ${index + 1}`,
      date: "7/2/2021",
      location: "36 Paramount Drive, Raynham MA 276",
      chip: {
        label: "Reforestación",
        color: "#385B4A",
        backgroundColor: "#D4FC92",
      },
    }));

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item md={6} sm={12} key={index}>
            <Paper elevation={0}>
              <CardEvent
                image={{
                  src: `https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60`,
                  alt: "Event",
                }}
                name={event.name}
                date={event.date}
                location={event.location}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                chip={event.chip}
                redirect={{
                  variant: "contained" as ButtonVariant,
                  label: "Registrarme",
                  to: `/events/${index + 1}`,
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
