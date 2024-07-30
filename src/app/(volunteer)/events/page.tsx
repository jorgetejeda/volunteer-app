"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Skeleton,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Masonry } from "@mui/lab";
import {
  CalendarMonthOutlined,
  LocationOnOutlined,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { CategoryLabel, InformationLabel } from "@components/index";
import theme from "@/theme";
import { useRouter } from "next/navigation";
import eventData from "../../../data/event.json";
import { lightOrDarkColor } from "@utils/index";

export interface Event {
  id: number;
  title: string;
  imageName: string;
  description: string;
  date: string;
  quota: number;
  location: string;
  duration: string;
  allDay: boolean;
  published: boolean;
  category: Category;
  usersQuantity: number;
}

export interface Category {
  id: number;
  title: string;
  backgroundColor: string;
}

export default function EventPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentEvent, setCurrentEvent] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "unpublished">(
    "all",
  );
  const router = useRouter();
  const isAdmin = true;

  const getEvents = async () => {
    setLoading(true);
    try {
      setEvents(eventData);
      console.log(events)
    } catch (error: any) {
      console.error("Error getting events", error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useLayoutEffect(() => {
     getEvents();
  }, []);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentEvent(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentEvent(null);
  };

  const handlePublish = () => {
    setActionLoading(true);
    setTimeout(() => {
      setEvents(
        events.map((event, index) =>
          index === currentEvent
            ? { ...event, published: !event.published }
            : event,
        ),
      );
      setActionLoading(false);
      handleMenuClose();
    }, 2000); // Simulación de tiempo de carga
  };

  const handleEdit = () => {
    router.push("/events/create");
  };

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    setActionLoading(true);
    setTimeout(() => {
      setEvents(events.filter((_, index) => index !== currentEvent));
      setActionLoading(false);
      setDialogOpen(false);
      handleMenuClose();
    }, 2000); // Simulación de tiempo de carga
  };

  const cancelDelete = () => {
    setDialogOpen(false);
    handleMenuClose();
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "published" && event.published) ||
        (filter === "unpublished" && !event.published);
      return matchesSearch && matchesFilter;
    });
  }, [events, searchTerm, filter]);

  return (
    <>
      {actionLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box mb={3}>
        <TextField
          label="Buscar eventos"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      {isAdmin && (
        <Box mb={3} display="flex" gap={2}>
          <Button
            variant={filter === "all" ? "contained" : "outlined"}
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "published" ? "contained" : "outlined"}
            onClick={() => setFilter("published")}
          >
            Publicados
          </Button>
          <Button
            variant={filter === "unpublished" ? "contained" : "outlined"}
            onClick={() => setFilter("unpublished")}
          >
            Sin Publicar
          </Button>
        </Box>
      )}
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3} sx={{ margin: 0 }}>
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Paper key={index}>
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
          ))}
        {!loading &&
          filteredEvents.length > 0 &&
          filteredEvents.map((event, index) => {
            return (
              <Paper key={index}>
                <Card
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={event.imageName}
                      alt="Event"
                      sx={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "100%",
                        background:
                          "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      right: 0,
                      padding: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CategoryLabel
                      label={event.category.title}
                      textColor={lightOrDarkColor(event.category.backgroundColor)}
                      backgroundColor={event.category.backgroundColor}
                    />
                    {isAdmin && (
                      <Box>
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={(e) => handleMenuOpen(e, index)}
                          sx={{
                            color: "white",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            marginLeft: 1,
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && currentEvent === index}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handlePublish}>
                            {event.published ? "Despublicar" : "Publicar"}
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={handleEdit}>Editar</MenuItem>
                          <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
                        </Menu>
                      </Box>
                    )}
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
                      label={event.date.toString()}
                      color={theme.palette.grey[200]}
                    />

                    <Typography variant="h4">{event.title}</Typography>

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
                    <Button
                      component="a"
                      variant="contained"
                      href={`/events/${index + 1}`}
                    >
                      Ver Detalle
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            );
          })}
      </Masonry>

      {!loading && filteredEvents.length === 0 && (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>
          Lo sentimos, no pudimos encontrar el evento que estás buscando.
        </Typography>
      )}

      <Dialog open={dialogOpen} onClose={cancelDelete}>
        <DialogTitle>Eliminar Evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar el evento{" "}
            {currentEvent !== null && events[currentEvent].title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
