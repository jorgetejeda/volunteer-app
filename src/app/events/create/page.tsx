"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Grid,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton,
  Checkbox,
  FormControlLabel,
  Backdrop,
  CircularProgress,
} from "@mui/material";
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
  duration?: number;
  allDay: boolean;
  usersQuantity: number;
}

const INITIAL_STATE: Event = {} as Event;

const EventForm = () => {
  const [dateType, setDateType] = useState("text");
  const [timeType, setTimeType] = useState("text");
  const [openModal, setOpenModal] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<Event>({
    defaultValues: INITIAL_STATE,
  });

  const handleSave: SubmitHandler<Event> = async (data) => {
    setLoading(true);
    try {
      // Simulación de llamada al backend
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setEventData(data);
      setOpenModal(true);
      reset(INITIAL_STATE);
    } catch (error) {
      console.error("Error al guardar el evento:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Aquí puedes agregar lógica para limpiar el formulario o redirigir al usuario
  };

  const handleAllDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsAllDay(checked);
    if (checked) {
      setValue("duration", undefined);
    }
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(handleSave)}>
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
                  accept={{ "image/*": [] }}
                  label="Arrastra una imagen aqui"
                  setValue={setValue}
                  clearErrors={clearErrors}
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
                    label="Duración (horas)"
                    fullWidth
                    type="number"
                    disabled={isAllDay}
                    {...register("duration", {
                      required: !isAllDay ? "La duración es obligatoria" : false,
                      valueAsNumber: true,
                    })}
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("allDay")}
                        onChange={handleAllDayChange}
                      />
                    }
                    label="El evento será todo el día"
                  />
                </Stack>
              </Paper>
              <Typography variant="h4">Cantidad de personas</Typography>
              <Paper sx={{ padding: 2 }} elevation={0}>
                <CustomTextField
                  label="Cupos"
                  fullWidth
                  type="number"
                  {...register("usersQuantity", {
                    required: "La cantidad de personas es obligatoria",
                    valueAsNumber: true,
                  })}
                  error={!!errors.usersQuantity}
                  helperText={errors.usersQuantity?.message}
                />
              </Paper>

              <Typography variant="h4">Ubicación</Typography>
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
              <Typography variant="h4">Categoría</Typography>
              <Paper sx={{ padding: 2 }} elevation={0}>
                <DropdownCategories
                  onChange={(categoryId) =>
                    setValue("category", parseInt(categoryId))
                  }
                />
              </Paper>
              <Stack spacing={2} direction="row">
                <Button
                  variant="text"
                  color="error"
                  onClick={() => console.log("Cancel")}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" size="small">
                  Guardar evento
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {eventData && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Evento creado</DialogTitle>
          <DialogContent>
            <DialogContentText>
              El evento "{eventData.title}" que empezará a la hora "
              {eventData.time}" en el lugar "{eventData.location}" ha sido
              creado.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MuiButton onClick={handleCloseModal} color="primary">
              OK
            </MuiButton>
          </DialogActions>
        </Dialog>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default EventForm;

