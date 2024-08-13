"use client"
import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Stack,
  Chip,
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
import { combineDateAndTime, lightOrDarkColor } from "@/utils";
import { useAuthContext } from "@/store/auth/AuthContext";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  // Your images here
];

export default function Home() {
  const { user, isAuthenticated } = useAuthContext();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [hours, setHours] = useState(0);

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
    if (isAuthenticated) {
      getEvents();
      getHours();
    }
  }, [isAuthenticated]);

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
                Bienvenido/a, {user && validateName(user)}
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
              <Grid item md={12} sm={12} xs={12}>
                <Paper sx={{ padding: 4 }}>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="body1" color={theme.palette.grey[200]}>
                      Horas Acumuladas
                    </Typography>
                    <Typography variant="h1" color="primary.main">
                      {hours}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Paper sx={{ padding: 4 }}>
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

                  <Box display="flex" gap={5} flexDirection="column">
                    {!loading && events.length > 0 ? (
                      events.map((event) => (
                        <Box key={event.id}>
                          <CardEvent
                            userEnrolled={event.isUserEnrolled}
                            name={event.title}
                            date={combineDateAndTime({
                              date: event.date,
                              time: event.time,
                            })}
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
