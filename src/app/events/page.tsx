"use client";
import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { ButtonVariant } from "@/components/ButtonLink/types";
import { Masonry } from "@mui/lab";

import eventData from "../../data/event.json";
import theme from "@/theme";
import { ButtonLink, CategoryLabel, InformationLabel } from "@/components";
import { CalendarMonthOutlined, LocationOnOutlined } from "@mui/icons-material";

export default function EventPage() {
  return (
    <>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
        {eventData.map((event, index) => (
          <Paper key={index} elevation={0}>
            <Card
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={event.imageUrl}
                alt="Event"
              />
              <Box sx={{ position: "absolute", right: 0, padding: 1 }}>
                <CategoryLabel
                  label={event.chip.label}
                  textColor={event.chip.textColor}
                  backgroundColor={event.chip.backgroundColor}
                />
              </Box>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  gap: 1,
                }}
              >
                <InformationLabel
                  icon={{
                    component: CalendarMonthOutlined,
                  }}
                  label={event.date}
                  color={theme.palette.grey[200]}
                />

                <Typography variant="h4" color={theme.palette.text.highlight}>
                  {event.name}
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.secondary}
                  sx={{ mt: 1 }}
                >
                  {event.description}
                </Typography>

                <InformationLabel
                  icon={{
                    component: LocationOnOutlined,
                  }}
                  label={event.location}
                  color={theme.palette.grey[200]}
                />
              </CardContent>
              <CardActions sx={{ paddingX: 2, paddingBottom: 2 }}>
                <ButtonLink
                  variant="contained"
                  label="Ver detalles"
                  to={`/events/${index + 1}`}
                />
              </CardActions>
            </Card>
          </Paper>
        ))}
      </Masonry>
    </>
  );
}
