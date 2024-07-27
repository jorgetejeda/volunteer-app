"use client";
import React, { useState } from "react";
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import theme from "@/theme";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Slider
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@mui/material/MobileStepper";
import { CardEvent } from "@/components";
import { ButtonVariant } from "@/components/ButtonLink/types";

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
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <>
      <Grid container spacing={2} id="container">
        <Grid item md={9} sm={12} display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="h3">Bienvenido, usuario!</Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item md={7} sm={12}>
              <Paper
                elevation={0}
                sx={{ paddingTop: 3, paddingBottom: 4, paddingX: 2 }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={2}
                >
                  <Typography variant="h3">Proximos eventos</Typography>
                  <Button component="a" href="/events" variant="text">
                    Ver todos
                  </Button>
                </Box>

                <Box display="flex" gap={3} flexDirection="column">
                  {[...Array(2)].map((_, index) => (
                    <Box key={index}>
                      <CardEvent
                        name={`Nombre del evento ${index + 1}`}
                        date="7/2/2021"
                        description=" Jorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc vulputate libero et velit interdum, ac
                            aliquet odio mattis.
                        "
                        location="36 Paramount Drive, Raynham MA 2767"
                        redirect={{
                          variant: "contained" as ButtonVariant,
                          label: "Ver detalles",
                          to: `/events/${index + 1}`,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid item md={5} sm={12}>
              <Paper elevation={0} sx={{ padding: 2 }}>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="body1" color={theme.palette.grey[200]}>
                    Horas Acumuladas
                  </Typography>
                  <Typography variant="h1" color={theme.palette.primary.main}>
                    120
                  </Typography>
                </Box>
              </Paper>

              <Paper elevation={0} sx={{ padding: 2, marginTop: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={4}
                >
                  <Typography variant="h3">Galeria</Typography>
                  <Button component="a" href="/events" variant="text">
                    Ver todas las imagenes
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
            </Grid>
          </Grid>
        </Grid>
        {/* Calendar */}
        <Grid item md={3} sm={12}>
          <Paper elevation={0} sx={{ padding: 2 }}>
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
    </>
  );
}
