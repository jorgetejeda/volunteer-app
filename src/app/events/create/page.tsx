"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Paper, TextField, Typography, Grid, Stack } from "@mui/material";
import { Button, DropZone, DropdownCategories, EditorView } from "@/components";
import styled from "@emotion/styled";

const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "24px",
  outline: "none",
  border: "none",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "24px",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface Event {
  id: number;
  title: string;
  imageName: {
    mainImage: string;
    images: string[];
  };
  description: string;
  instructions: string;
  date: string;
  time: string;
  location: string;
  category: number;
  usersQuantity: number;
}

const INITIAL_STATE: Event = {} as Event;

const EventForm = () => {
  const [dateType, setDateType] = useState("text");
  const [timeType, setTimeType] = useState("text");

  const {
    register,
    handleSubmit: handleEventSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Event>({
    defaultValues: INITIAL_STATE,
  });

  const handleSave: SubmitHandler<Event> = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ marginTop: 4, marginBottom: 3 }}>
      <Box
        component="form"
        onSubmit={handleEventSubmit(handleSave)}
        onClick={(e) => e.stopPropagation()}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Typography variant="h3">Agregar nuevo evento</Typography>
              <CustomTextField
                label="Escribir titulo del evento"
                fullWidth
                {...register("title", { required: "El título es obligatorio" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <Typography variant="h4">Descripción del evento</Typography>
              <EditorView
                placeholder="Agrega la descripción del evento"
                onChange={(value) => setValue("description", value)}
              />
              <Typography variant="h4">Instrucciones del evento</Typography>
              <EditorView
                placeholder="Agrega las instrucciones del evento"
                onChange={(value) => setValue("instructions", value)}
              />
              <Typography variant="h4">Imagen del evento</Typography>
              <Paper sx={{ padding: 2 }} elevation={0}>
                <DropZone
                  accept="image/*"
                  label="Arrastra una imagen aqui"
                  onDrop={(acceptedFiles) =>
                    setValue("imageName.mainImage", acceptedFiles[0]?.preview)
                  }
                />
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Typography variant="h4">Datos del evento</Typography>
              <Paper sx={{ padding: 2 }} elevation={0}>
                <Stack spacing={2}>
                  <CustomTextField
                    label="Fecha de inicio"
                    fullWidth
                    type={dateType}
                    {...register("date", {
                      required: "La fecha es obligatoria",
                    })}
                    onFocus={() => setDateType("date")}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      if (!e.target.value) {
                        setDateType("text");
                      }
                    }}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                  <CustomTextField
                    label="Hora inicio del evento"
                    fullWidth
                    type={timeType}
                    {...register("time", {
                      required: "La hora es obligatoria",
                    })}
                    onFocus={() => setTimeType("time")}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      if (!e.target.value) {
                        setTimeType("text");
                      }
                    }}
                    error={!!errors.time}
                    helperText={errors.time?.message}
                  />
                  <CustomTextField
                    label="Cantidad de personas"
                    fullWidth
                    type="number"
                    {...register("usersQuantity", {
                      required: "La cantidad de personas es obligatoria",
                      valueAsNumber: true,
                    })}
                    error={!!errors.usersQuantity}
                    helperText={errors.usersQuantity?.message}
                  />
                </Stack>
              </Paper>
              <Stack spacing={2} direction="row">
                <Button
                  variant="text"
                  color="error"
                  onClick={() => console.log("Cancel")}
                >
                  Cancelar
                </Button>
                <Button variant="contained" size="small">
                  Publicar evento
                </Button>
              </Stack>
              <Typography variant="h4">Ubicacion</Typography>
              <Paper sx={{ padding: 2 }} elevation={0}>
                <CustomTextField
                  label="Nombre del lugar"
                  fullWidth
                  {...register("location", {
                    required: "La ubicación es obligatoria",
                  })}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              </Paper>
              <Typography variant="h4">Categoria</Typography>
              <Paper sx={{ padding: 2 }} elevation={0}>
                <DropdownCategories
                  onChange={(categoryId) =>
                    setValue("category", parseInt(categoryId))
                  }
                />
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EventForm;
