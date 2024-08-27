"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import theme from "@theme/theme";
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
import { cleanHtml, combineDateAndTime, lightOrDarkColor } from "@/utils";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";

export default function Page({ params }: { params: { id: number } }) {
  const id = +params.id;

  const [event, setEvent] = useState<Event>({} as Event);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEnrolling, setIsEnrolling] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [enrollMessage, setEnrollMessage] = useState<{
    title: string;
    message: string;
  }>({
    title: "",
    message: "",
  });

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

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  const handleToggleEnrollment = async (id: number, isEnrolling: boolean) => {
    setIsEnrolling(true);
    const { data, isSucceeded } = await EventService.toggleEnrollUnenrollEvent(id, isEnrolling ? 'I' : 'A' );
    setIsEnrolling(false);

    const successMessage = isEnrolling
      ? "Inscripción exitosa!"
      : "Inscripción cancelada!";
    const errorMessage = isEnrolling
      ? "Error al inscribirse."
      : "Error al cancelar inscripción.";
    const successDescription = isEnrolling
      ? "Gracias por inscribirte en el evento."
      : "Tu inscripción ha sido cancelada.";

    setEnrollMessage({
      title: isSucceeded ? successMessage : errorMessage,
      message: isSucceeded
        ? successDescription
        : "Por favor, intenta de nuevo.",
    });

    setOpenDialog(false);

    if (isSucceeded) {
      setEvent((prev: Event) => ({
        ...prev,
        isUserEnrolled: data.status === 'A' ? 1 : 0,
      }));
      setOpenSuccessDialog(true);
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
        height={450}
        width="100%"
        position="relative"
        borderRadius={3}
        overflow="hidden"
      >
        <Carousel
          infiniteLoop
          autoPlay
          showArrows={true}
          showStatus={false}
          showThumbs={false}
        >
          {event.images.map((image, index) => (
            <div
              key={index}
              style={{ position: "relative", width: "100%", height: "450px" }}
            >
              <Image
                src={image.documentUrl}
                alt={image.documentName}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </Carousel>
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
        <Grid item sm={12} xs={12} md={5}>
          <Paper sx={{ padding: 2 }}>
            <Box display="flex" flexDirection="column" gap={3}>
              <InformationLabel
                icon={{
                  component: CalendarMonthOutlined,
                  color: theme.palette.primary.main,
                }}
                label={combineDateAndTime({
                  date: event.date,
                  time: event.time,
                })}
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
          {event.isUserEnrolled
            ? "Cancelar Inscripción"
            : "Confirmar Inscripción"}
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
          <Button
            variant="outlined"
            onClick={handleCloseDialog}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() =>
              handleToggleEnrollment(event.id, !!event.isUserEnrolled)
            }
            color="primary"
            variant="contained"
            disabled={isEnrolling}
            startIcon={isEnrolling && <CircularProgress size={20} />}
          >
            {event.isUserEnrolled ? "Cancelar Inscripción" : "Inscribirme"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title">
          {enrollMessage.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            {enrollMessage.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCloseSuccessDialog}
            color="primary"
          >
            Gracias
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
