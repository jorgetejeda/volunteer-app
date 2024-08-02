"use client";
import React, { useState, useEffect } from "react";
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
  Checkbox,
  FormControlLabel,
  Backdrop,
  CircularProgress,
  Button,
} from "@mui/material";
import { DropZone, DropdownCategories, EditorView } from "@components/index";
import { EventDto } from "@/core/types";
import { useRouter } from "next/navigation";
import EventService from "@/services/event/event.services";

const INITIAL_STATE: EventDto = {
  title: "",
  description: "",
  instructions: "",
  categoryId: 0,
  time: "",
  date: "",
  quota: 0,
  location: "",
  duration: 0,
  allDay: false,
  mainImage: "",
  images: [],
};

const EventForm = () => {
  const [dateType, setDateType] = useState("text");
  const [timeType, setTimeType] = useState("text");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [eventData, setEventData] = useState<EventDto | null>(null);
  const router = useRouter();
  const eventId = null;
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
    reset,
  } = useForm<EventDto>({
    defaultValues: INITIAL_STATE,
  });

  useEffect(() => {
    if (eventId) {
      const fetchEventData = async () => {
        setLoading(true);
        try {
          const { data: event, isSucceeded } =
            await EventService.getEventById(eventId);
          if (!isSucceeded) {
            throw new Error("Error al cargar los datos del evento");
          }
          setValue("title", event.title);
          setValue("description", event.description);
          setValue("instructions", event.instructions);
          setValue("categoryId", event.category.id);
          setValue("time", event.time);
          setValue("date", event.date.toISOString().split("T")[0]);
          setValue("quota", event.quota);
          setValue("location", event.location);
          setValue("duration", +event.duration);
          setValue("allDay", event.allDay);
          setIsAllDay(event.allDay);
        } catch (error) {
          console.error("Error al cargar los datos del evento:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEventData();
    }
  }, [eventId, setValue]);

  const handleSave: SubmitHandler<EventDto> = async (data) => {
    setLoading(true);
    //Validate mainImage
    if (!data.mainImage) {
      setError("mainImage", { message: "La imagen principal es obligatoria" });
      setLoading(false);
      return;
    }
    try {
      let response;
      if (eventId) {
        response = await EventService.updateEvent(eventId, data);
      } else {
        response = await EventService.createEvent(data);
      }
      if (!response.isSucceeded) {
        throw new Error("Error al guardar el evento");
      }

      setOpenModal(true);
      reset(INITIAL_STATE);
      setEventData(data);
    } catch (error: any) {
      console.error("Error al guardar el evento:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    router.push("/events");
  };

  const handleAllDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsAllDay(checked);
    if (checked) {
      setValue("duration", 0);
    }
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(handleSave)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Typography variant="h3">
                {eventId ? "Editar evento" : "Agregar nuevo evento"}
              </Typography>
              <TextField
                label="Escribir título del evento"
                fullWidth
                {...register("title", { required: "El título es obligatorio" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <Typography variant="h4">Descripción del evento</Typography>
              <EditorView
                onChange={(value) => setValue("description", value)}
                defaultValue={
                  eventData?.description || "Agrega la descripción del evento"
                }
              />
              <Typography variant="h4">Instrucciones del evento</Typography>
              <EditorView
                onChange={(value) => setValue("instructions", value)}
                defaultValue={
                  eventData?.instructions ||
                  "Agrega las instrucciones del evento"
                }
              />
              <Typography variant="h4">Imagen del evento</Typography>
              <Paper sx={{ padding: 2 }}>
                <DropZone
                  accept={{ "image/jpg": [".jpg", ".jpeg"] }}
                  label="Arrastra una imagen aquí"
                  setValue={setValue as any}
                  error={errors.mainImage}
                  clearErrors={() => clearErrors()}
                  //FIXME: add defaultValue prop to DropZone component
                  // defaultValue={
                  //   eventData?.mainImage ? [eventData.mainImage] : []
                  // }
                />
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Typography variant="h4">Datos del evento</Typography>
              <Paper sx={{ padding: 2 }}>
                <Stack spacing={2}>
                  <TextField
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
                  <TextField
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
                  <TextField
                    label="Duración (horas)"
                    fullWidth
                    type="number"
                    disabled={isAllDay}
                    {...register("duration", {
                      required: !isAllDay
                        ? "La duración es obligatoria"
                        : false,
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
              <Paper sx={{ padding: 2 }}>
                <TextField
                  label="Cupos"
                  fullWidth
                  type="number"
                  {...register("quota", {
                    required: "La cantidad de personas es obligatoria",
                    valueAsNumber: true,
                  })}
                  error={!!errors.quota}
                  helperText={errors.quota?.message}
                />
              </Paper>

              <Typography variant="h4">Ubicación</Typography>
              <Paper sx={{ padding: 2 }}>
                <TextField
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
              <Paper sx={{ padding: 2 }}>
                <DropdownCategories
                  onChange={(categoryId) => setValue("categoryId", categoryId)}
                  value={eventData?.category?.id || 0}
                />
              </Paper>
              <Stack spacing={2} direction="row">
                <Button
                  variant="text"
                  color="error"
                  onClick={() => router.push("/events")}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" size="small">
                  {eventId ? "Actualizar evento" : "Guardar evento"}
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {eventData && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Evento {eventId ? "actualizado" : "creado"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              El evento <b>{eventData.title}</b> que empezará a la hora{" "}
              <b>{eventData.time}</b> en el lugar <b>{eventData.location}</b> ha
              sido {eventId ? "actualizado" : "creado"}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Backdrop
        sx={{
          color: (theme) => theme.palette.common.white,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default EventForm;
