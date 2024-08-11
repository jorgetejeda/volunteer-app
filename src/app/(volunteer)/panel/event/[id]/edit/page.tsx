"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
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
import { UpdateEventDto } from "@/core/types";
import { useRouter, useParams } from "next/navigation";
import EventService from "@/services/event/event.services";

const INITIAL_STATE: UpdateEventDto = {
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

const EditEventForm = () => {
  const [dateType, setDateType] = useState("text");
  const [timeType, setTimeType] = useState("text");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [eventData, setEventData] = useState<UpdateEventDto>();
  const router = useRouter();
  const { id: eventId } = useParams(); // Obtener el ID del evento desde la URL
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
    reset,
  } = useForm<UpdateEventDto>({
    defaultValues: INITIAL_STATE,
  });

  useLayoutEffect(() => {
    console.log("eventId", eventId);
    if (eventId) {
      const fetchEventData = async () => {
        setLoading(true);
        try {
          const { data: event, isSucceeded } = await EventService.getEventById(
            +eventId
          );

          console.log("categoria", event.category.id);
          if (!isSucceeded) {
            throw new Error("Error al cargar los datos del evento");
          }
          setValue("title", event.title);
          setValue("description", event.description);
          setValue("instructions", event.instructions);
          setValue("categoryId", event.category.id);
          setValue("time", event.time);
          setValue("date", event.date.toString().split("T")[0]);
          setValue("quota", event.quota);
          setValue("location", event.location);
          setValue("duration", +event.duration);
          setValue("allDay", event.allDay);
          setValue("mainImage", event.mainImage);
          setValue("images", event.images);
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

  const handleSave: SubmitHandler<UpdateEventDto> = async (data) => {
    setLoading(true);
    // Validate mainImage
    if (!data.mainImage) {
      setError("mainImage", { message: "La imagen principal es obligatoria" });
      setLoading(false);
      return;
    }
    try {
      const response = await EventService.updateEvent(+eventId, data);
      if (!response.isSucceeded) {
        throw new Error("Error al actualizar el evento");
      }

      setOpenModal(true);
      setEventData(data);
    } catch (error: any) {
      console.error("Error al actualizar el evento:", error);
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
              <Typography variant="h3">Editar evento</Typography>
              <TextField
                label="Escribir título del evento"
                fullWidth
                {...register("title", { required: "El título es obligatorio" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <Typography variant="h4">Descripción del evento</Typography>
              <EditorView
                undo
                redo
                bold
                italic
                clearFormatting
                onChange={(value) => setValue("description", value)}
                defaultValue={getValues("description")}
              />
              <Typography variant="h4">Instrucciones del evento</Typography>
              <EditorView
                undo
                redo
                bold
                italic
                underline
                strikeThrough
                numberedList
                bulletList
                clearFormatting
                styles
                onChange={(value) => setValue("instructions", value)}
                defaultValue={getValues("instructions")}
              />
              <Typography variant="h4">Imagen del evento</Typography>

              <Paper sx={{ padding: 2 }}>
                <DropZone
                  accept={{ "image/jpg": [".jpg", ".jpeg"] }}
                  label="Haz click para seleccionar las imágenes"
                  hint="Solo se permiten archivos .jpg"
                  setValue={setValue as any}
                  error={errors.mainImage}
                  clearErrors={() => clearErrors()}
                  //   defaultValue={
                  //     eventData?.images.map((img) => img.documentUrl) || []
                  //   }
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
                    type="text"
                    disabled={isAllDay}
                    {...register("duration", {
                      required: !isAllDay
                        ? "La duración es obligatoria"
                        : false,
                      valueAsNumber: true,
                      validate: (value) =>
                        value >= 0 || "La cantidad debe ser mayor o igual a 0",
                    })}
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    onKeyDown={(event) => {
                      if (
                        [
                          "Backspace",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ].includes(event.key)
                      )
                        return;

                      if (!/^[0-9]$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("allDay")}
                        checked={isAllDay}
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
                  type="text"
                  {...register("quota", {
                    required: "La cantidad de personas es obligatoria",
                    valueAsNumber: true,
                    validate: (value) =>
                      value >= 0 || "La cantidad debe ser mayor o igual a 0",
                  })}
                  error={!!errors.quota}
                  helperText={errors.quota?.message}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  onKeyDown={(event) => {
                    if (
                      ["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(
                        event.key
                      )
                    )
                      return;

                    if (!/^[0-9]$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Paper>

              <Typography variant="h4">Categoría del evento</Typography>

              <Paper sx={{ padding: 2 }}>
                <DropdownCategories
                  value={getValues("categoryId")}
                  onChange={(categoryId) => setValue("categoryId", categoryId)}
                />
              </Paper>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Guardar cambios
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Evento actualizado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El evento ha sido actualizado correctamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        open={loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default EditEventForm;
