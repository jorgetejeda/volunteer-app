
"use client";
import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Skeleton, Stack, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Masonry } from "@mui/lab";
import { CalendarMonthOutlined, LocationOnOutlined, MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  ButtonLink,
  CategoryLabel,
  InformationLabel,
  Button,
  TransitionLink,
} from "@/components";
import theme from "@/theme";
import eventData from "../../data/event.json";

export default function EventPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentEvent, setCurrentEvent] = useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentEvent(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentEvent(null);
  };

  const handlePublish = () => {
    console.log('Publish event', currentEvent);
    handleMenuClose();
  };

  const handleEdit = () => {
    console.log('Edit event', currentEvent);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Delete event', currentEvent);
    handleMenuClose();
  };

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
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3} sx={{ margin: 0 }}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Paper key={index} elevation={0}>
                <Skeleton variant="rectangular" width="100%" height={150} />
                <Box sx={{ padding: 2 }}>
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem", mt: 1 }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem", mt: 1 }} />
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
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={event.imageUrl}
                      alt="Event"
                      sx={{ width: '100%', height: '150px', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
                      }}
                    />
                  </Box>
                  <Box sx={{ position: "absolute", right: 0, padding: 1, display: 'flex', alignItems: 'center' }}>
                    <CategoryLabel
                      label={event.chip.label}
                      textColor={event.chip.textColor}
                      backgroundColor={event.chip.backgroundColor}
                    />
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleMenuOpen(e, index)}
                      sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.7)', marginLeft: 1 }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && currentEvent === index}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handlePublish}>Publicar</MenuItem>
                      <Divider />
                      <MenuItem onClick={handleEdit}>Editar</MenuItem>
                      <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
                    </Menu>
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

                    <Typography
                      variant="h4"
                      color={theme.palette.text.highlight}
                    >
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
                    <TransitionLink href={`/events/${index + 1}`} passHref>
                      <Button component="a" variant="text">
                        Ver Detalle
                      </Button>
                    </TransitionLink>
                  </CardActions>
                </Card>
              </Paper>
            ))}
      </Masonry>
    </>
  );
}
