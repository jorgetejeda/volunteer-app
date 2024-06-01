"use client";
import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import { CardEvent } from "@/components";

export default function EventPage() {
  const events = Array(10)
    .fill(null)
    .map((_, index) => ({
      name: `Nombre del evento ${index + 1}`,
      date: "7/2/2021",
      location: "36 Paramount Drive, Raynham MA 276",
    }));

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item md={6} sm={12} key={index}>
            <Paper elevation={0}>
              <CardEvent
                name={event.name}
                date={event.date}
                location={event.location}
                redirect={{
                  label: "Registrarme",
                  to: `/events/${index}`,
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
