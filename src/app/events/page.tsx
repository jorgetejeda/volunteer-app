"use client";
import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Skeleton } from "@mui/material";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Masonry } from "@mui/lab";
import { CalendarMonthOutlined, LocationOnOutlined } from "@mui/icons-material";
import { ButtonLink, CategoryLabel, InformationLabel } from "@/components";
import theme from "@/theme";
import eventData from "../../data/event.json";

export default function EventPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setEvents(eventData); // Asigna los datos a tu estado
        setLoading(false);
      }, 2000); // Simulación de tiempo de carga
    };

    fetchData();
  }, []);

  return (
    <>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3} sx={{margin: 0}}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Paper key={index} elevation={0}>
                <Skeleton variant="rectangular" width="100%" height={150} />
                <Box sx={{ padding: 2 }}>
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem', mt: 1 }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem', mt: 1 }} />
                </Box>
                <Box sx={{ padding: 2 }}>
                  <Skeleton variant="rectangular" width={100} height={30} />
                </Box>
              </Paper>
            ))
          : events.map((event, index) => (
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

