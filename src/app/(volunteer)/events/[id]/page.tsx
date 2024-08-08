"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import theme from "@/theme";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  LocationOnOutlined,
  CalendarMonthOutlined,
  Menu,
  TimerOutlined,
} from "@mui/icons-material";
import { InformationLabel, CategoryLabel } from "@components/index";
//@Types
import { Event } from "@/core/types";
//@Services
import EventService from "@/services/event/event.services";
//@Utils
import { cleanHtml, lightOrDarkColor } from "@/utils";

export default function Page({ params }: { params: { id: number } }) {
  const id = +params.id;

  const [event, setEvent] = useState<Event>({} as Event);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEnrolling, setIsEnrolling] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [enrollMessage, setEnrollMessage] = useState<string>("");

  const getEvents = useCallback(async () => {
    const { data, isSucceeded } = await EventService.getEventById(id);
    if (!isSucceeded || !data) {
      console.log("Error");
    }
    setEvent(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEnroll = async () => {
    setIsEnrolling(true);
    const { isSucceeded } = await EventService.enrollEvent(id);
    setIsEnrolling(false);
    setEnrollMessage(
      isSucceeded ? "Inscripción exitosa!" : "Error al inscribirse."
    );
    setOpenDialog(false);
    if (isSucceeded) {
      setEvent((prev) => ({ ...prev, isUserEnrolled: true }));
    }
  };

  const handleUnEnroll = async () => {
    setIsEnrolling(true);
    const { isSucceeded } = await EventService.unEnrollEvent(id);
    setIsEnrolling(false);
    setEnrollMessage(
      isSucceeded ? "Inscripción cancelada!" : "Error al cancelar inscripción."
    );
    setOpenDialog(false);
    if (isSucceeded) {
      setEvent((prev) => ({ ...prev, isUserEnrolled: false }));
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

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
        <CategoryLabel
          label={event.category.title}
          textColor={lightOrDarkColor(event.category.color)}
          backgroundColor={event.category.color}
        />
        <Typography variant="h1" marginTop={1}>
          {event.title}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item sm={12} md={7}>
          <Paper sx={{ padding: 2 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="body1">
                {cleanHtml(event.description)}
              </Typography>
              <Box>
                <Button
                  variant={event.isUserEnrolled ? "outlined" : "contained"}
                  onClick={handleOpenDialog}
                >
                  {event.isUserEnrolled
                    ? "No quiero participar"
                    : "Quiero participar"}
                  {isEnrolling && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: "white",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
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
                label={event.date}
              />

              <InformationLabel
                icon={{
                  component: TimerOutlined,
                  color: theme.palette.primary.main,
                }}
                label={`Duración: ${event.duration} horas`}
              />

              <InformationLabel
                icon={{
                  component: LocationOnOutlined,
                  color: theme.palette.primary.main,
                }}
                label={event.location}
              />

              <InformationLabel
                label="Instrucciones"
                icon={{
                  color: theme.palette.primary.main,
                  component: Menu,
                }}
              />
              <Typography variant="body1">
                {cleanHtml(event.instructions)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {event.isUserEnrolled ? "Cancelar Inscripción" : "Confirmar Inscripción"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {event.isUserEnrolled
              ? `¿Estás seguro que deseas cancelar tu inscripción en el evento '${event.title}'?`
              : `¿Estás seguro que deseas inscribirte en el evento '${event.title}'?`}
            <br />
            <strong>Fecha:</strong> {event.date}
            <br />
            <strong>Ubicación:</strong> {event.location}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={event.isUserEnrolled ? handleUnEnroll : handleEnroll}
            color="primary"
            disabled={isEnrolling}
            startIcon={isEnrolling && <CircularProgress size={20} />}
          >
            {event.isUserEnrolled ? "Cancelar Inscripción" : "Inscribirme"}
          </Button>
        </DialogActions>
      </Dialog>

      {enrollMessage && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={3}
        >
          <Typography variant="h6" color="success">
            {enrollMessage}
          </Typography>
        </Box>
      )}
    </>
  );
}
