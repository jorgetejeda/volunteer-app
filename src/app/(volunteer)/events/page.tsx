"use client";
import React, { useState, useMemo, useEffect, use } from "react";
import theme from "@/theme";
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
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";
import {
  CalendarMonthOutlined,
  LocationOnOutlined,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import {
  CategoryLabel,
  DataNotFound,
  InformationLabel,
} from "@components/index";
//@Hooks
import { useRouter } from "next/navigation";
//@Utils
import {
  cleanHtml,
  combineDateAndTime,
  elipsisText,
  lightOrDarkColor,
} from "@utils/index";
//@Services
import EventService from "@/services/event/event.services";
//@Types
import { Event } from "@/core/types";
import { useAuthContext } from "@/store/auth/AuthContext";

export default function EventPage() {
  const { isAuthenticated, isAdmin } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<
    "all" | "published" | "unpublished" | "enrolled" | "notEnrolled"
  >("all");
  const router = useRouter();

  const getEvents = async () => {
    setLoading(true);
    try {
      const { data, isSucceeded } = await EventService.getEvents({
        limit: 10,
        offset: 0,
      });
      if (isSucceeded) {
        setEvents(data);
      }
    } catch (error: any) {
      console.error("Error getting events", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    eventId: number
  ) => {
    setAnchorEl(event.currentTarget);
    const selectedEvent = events.find((e) => e.id === eventId);
    setCurrentEvent(selectedEvent || null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentEvent(null);
  };

  const handlePublish = async (id: number) => {
    try {
      setLoading(true);
      const { isSucceeded }: { data: boolean; isSucceeded: boolean } =
        await EventService.togglePublishEvent(id);
      if (!isSucceeded) {
        throw new Error("Error al publicar el evento");
      }
      getEvents();
    } catch (error: any) {
      console.error("Error publishing event", error.message);
    } finally {
      setLoading(false);
      handleMenuClose();
    }
  };

  const handleEdit = () => {
    if (currentEvent) {
      router.push(`panel/event/${currentEvent.id}/edit`);
    }
  };

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (currentEvent) {
      try {
        setLoading(true);
        const { isSucceeded } = await EventService.deleteEvent(currentEvent.id);
        if (isSucceeded) {
          setEvents(events.filter((event) => event.id !== currentEvent.id));
          setDialogOpen(false);
          handleMenuClose();
        }
      } catch (error: any) {
        console.error("Error deleting event", error.message);
      } finally {
        setLoading(false);
      }
    }
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

      if (isAdmin) {
        // Administradores pueden ver todos los eventos
        const matchesFilter =
          filter === "all" ||
          (filter === "published" && event.published) ||
          (filter === "unpublished" && !event.published) ||
          (filter === "enrolled" && event.isUserEnrolled === 1) ||
          (filter === "notEnrolled" && event.isUserEnrolled === 0);
        return matchesSearch && matchesFilter;
      } else {
        // Opciones para usuarios no administradores
        const matchesFilter =
          filter === "all" ||
          (filter === "enrolled" && event.isUserEnrolled === 1) ||
          (filter === "notEnrolled" && event.isUserEnrolled === 0);
        return matchesSearch && matchesFilter;
      }
    });
  }, [events, searchTerm, filter, isAdmin]);

  return (
    <>
      {loading && (
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
      <Box mb={3}>
        <Stack direction="row" spacing={1}>
          <Button
            variant={filter === "all" ? "contained" : "outlined"}
            onClick={() => setFilter("all")}
            size="small"
          >
            Todos
          </Button>

          {isAdmin && (
            <>
              <Button
                variant={filter === "published" ? "contained" : "outlined"}
                onClick={() => setFilter("published")}
                size="small"
              >
                Publicados
              </Button>
              <Button
                variant={filter === "unpublished" ? "contained" : "outlined"}
                onClick={() => setFilter("unpublished")}
                size="small"
              >
                Sin Publicar
              </Button>
            </>
          )}
          <Button
            variant={filter === "enrolled" ? "contained" : "outlined"}
            onClick={() => setFilter("enrolled")}
            size="small"
          >
            Inscriptos
          </Button>
          <Button
            variant={filter === "notEnrolled" ? "contained" : "outlined"}
            onClick={() => setFilter("notEnrolled")}
            size="small"
          >
            No Inscriptos
          </Button>
        </Stack>
      </Box>

      {!loading && filteredEvents.length === 0 && events.length !== 0 && (
        <DataNotFound message="Lo sentimos, no pudimos encontrar el evento que estás buscando" />
      )}
      {!loading && events.length === 0 && (
        <DataNotFound message="No hay eventos disponibles" />
      )}
      {!loading && filteredEvents.length > 0 && (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={3}
          sx={{ margin: 0 }}
        >
          {filteredEvents.map((event) => (
            <Paper key={event.id}>
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
                    image={event.images[0].documentUrl}
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
                    textColor={lightOrDarkColor(event.category.color)}
                    backgroundColor={event.category.color}
                  />
                  {isAdmin && (
                    <Box>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleMenuOpen(e, event.id)}
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
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        elevation={1}
                      >
                        <MenuItem
                          onClick={() => handlePublish(currentEvent!.id)}
                        >
                          {currentEvent?.published ? "Despublicar" : "Publicar"}
                        </MenuItem>
                        <MenuItem onClick={handleEdit}>Editar</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
                      </Menu>
                    </Box>
                  )}
                </Box>
                <CardContent>
                  <Stack direction="column" spacing={1}>
                    <InformationLabel
                      icon={{ component: CalendarMonthOutlined }}
                      label={combineDateAndTime({
                        date: event.date,
                        time: event.time,
                      })}
                      color={theme.palette.grey[200]}
                    />
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography
                      variant="body2"
                      color={theme.palette.text.secondary}
                      sx={{ mt: 1 }}
                    >
                      {cleanHtml(elipsisText({ value: event.description }))}
                    </Typography>
                    <InformationLabel
                      icon={{ component: LocationOnOutlined }}
                      label={event.location}
                      color={theme.palette.grey[200]}
                    />
                  </Stack>
                </CardContent>
                <CardActions sx={{ paddingX: 2, paddingBottom: 2 }}>
                  <Button
                    component="a"
                    variant="contained"
                    href={`/events/${event.id}`}
                  >
                    Ver Detalle
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          ))}
        </Masonry>
      )}
      <Dialog
        open={dialogOpen}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro de que deseas eliminar este evento?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={confirmDelete}
            color="secondary"
            autoFocus
            disabled={actionLoading}
          >
            {actionLoading ? <CircularProgress size={24} /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
