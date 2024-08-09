"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSession } from "next-auth/react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@mui/material/MobileStepper";
import { CardEvent, DataNotFound } from "@components/index";
import EventService from "@/services/event/event.services";
import { Event } from "@/core/types";
import theme from "@/theme";
import { lightOrDarkColor } from "@/utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

export default function Home() {
  const { data: session, status } = useSession();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [hours, setHours] = useState(0);
  const maxSteps = images.length;

  const getEvents = async () => {
    setLoading(true);
    try {
      const { data } = await EventService.getEvents({
        limit: 10,
        offset: 0,
      });

      setEvents(data);
    } catch (error: any) {
      console.error("Error getting events", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getHours = async () => {
    setLoading(true);
    try {
      const { data, isSucceeded } = await EventService.userTotalHours();

      setHours(+data);
    } catch (error: any) {
      console.error("Error getting hours", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getEvents();
      getHours();
    }
  }, [status]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const validateName = (name: string | undefined | null): string | null => {
    if (!name) return "";

    const split = name.split(",");
    if (split.length >= 2) {
      return `${split[1]} ${split[0]}`;
    }

    return name;
  };

  return (
    <>
      {(status === "loading" || loading) && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!loading && (
        <Grid container spacing={2} id="container">
          <Grid
            item
            md={9}
            sm={12}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Box>
              <Typography variant="h3">
                Bienvenido, {session && validateName(session.user?.name)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" textAlign="justify">
                En Crecer, creemos firmemente en la responsabilidad social y en
                el poder de la colaboración para generar cambios significativos.
                Nuestro programa de voluntariado corporativo nace de la
                convicción de que cada acción cuenta y de que juntos podemos
                contribuir para forjar un mundo mejor.
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item md={7} sm={12} xs={12}>
                <Paper sx={{ padding: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={2}
                  >
                    <Typography variant="h3">Próximos eventos</Typography>
                    <Button component="a" href="/events" variant="text">
                      Ver todos
                    </Button>
                  </Box>

                  <Box display="flex" gap={3} flexDirection="column">
                    {!loading && events.length > 0 ? (
                      events.map((event) => (
                        <Box key={event.id}>
                          <CardEvent
                            name={event.title}
                            date={event.date}
                            description={event.description}
                            location={event.location}
                            chip={{
                              label: event.category.title,
                              color: lightOrDarkColor(event.category.color),
                              backgroundColor: event.category.color,
                            }}
                            redirect={{
                              variant: "contained",
                              label: "Ver detalles",
                              to: `/events/${event.id}`,
                            }}
                          />
                        </Box>
                      ))
                    ) : (
                      <DataNotFound />
                    )}
                  </Box>
                </Paper>
              </Grid>
              <Grid item md={5} sm={12}>
                <Stack spacing={2}>
                  <Paper sx={{ padding: 2 }}>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Typography
                        variant="body1"
                        color={theme.palette.grey[200]}
                      >
                        Horas Acumuladas
                      </Typography>
                      <Typography variant="h1" color="primary.main">
                        {hours}
                      </Typography>
                    </Box>
                  </Paper>

                  <Paper sx={{ padding: 2 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      marginBottom={4}
                    >
                      <Typography variant="h3">Galería</Typography>
                      <Button component="a" href="/events" variant="text">
                        Ver todas las imágenes
                      </Button>
                    </Box>
                    <AutoPlaySwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={activeStep}
                      onChangeIndex={handleStepChange}
                      enableMouseEvents
                    >
                      {images.map((step, index) => (
                        <div key={step.label}>
                          {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                              component="img"
                              sx={{
                                height: 232,
                                display: "block",
                                maxWidth: 400,
                                overflow: "hidden",
                                width: "100%",
                                borderRadius: "8px",
                              }}
                              src={step.imgPath}
                              alt={step.label}
                            />
                          ) : null}
                        </div>
                      ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                      steps={maxSteps}
                      position="static"
                      activeStep={activeStep}
                      sx={{ background: "transparent", marginTop: 1 }}
                      nextButton={
                        <Button
                          size="small"
                          onClick={handleNext}
                          disabled={activeStep === maxSteps - 1}
                        >
                          {/* {theme.direction === "rtl" ? (
                            <KeyboardArrowLeft />
                          ) : (
                            <KeyboardArrowRight />
                          )} */}
                        </Button>
                      }
                      backButton={
                        <Button
                          size="small"
                          onClick={handleBack}
                          disabled={activeStep === 0}
                        >
                          {/* {theme.direction === "rtl" ? (
                            <KeyboardArrowRight />
                          ) : (
                            <KeyboardArrowLeft />
                          )} */}
                        </Button>
                      }
                    />
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h3">Calendario</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  sx={{
                    width: "auto",
                    maxWidth: "100%",
                    fontSize: "0.75rem",
                    "& .MuiPickersCalendarHeader-root": {
                      paddingLeft: "0",
                      paddingRight: "0",
                    },
                    "& .MuiPickersDay-today": {
                      color: theme.palette.common.white,
                      background: theme.palette.primary.main,
                      border: "none",
                      outline: "none",
                    },
                    "& .MuiPickersDay-dayWithMargin": {
                      width: "30px",
                      height: "30px",
                    },
                    "& .MuiDayCalendar-weekDayLabel": {
                      width: "30px",
                    },
                  }}
                />
              </LocalizationProvider>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}
