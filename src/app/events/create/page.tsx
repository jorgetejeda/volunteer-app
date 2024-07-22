"use client";
import React, { useState } from "react";
import { Box, Paper, TextField, Typography, Grid, Stack } from "@mui/material";
import { Button, DropZone, DropdownCategories, EditorView } from "@/components";

const EventForm = () => {
  const [dateType, setDateType] = useState("text");
  const [timeType, setTimeType] = useState("text");

  const handleCancel = () => {};

  const handleSave = () => {};

  return (
    <Box sx={{ marginTop: 4, marginBottom: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <Typography variant="h3">Agregar nuevo evento</Typography>
            <TextField
              label="Escribir titulo del evento"
              fullWidth
              name="title"
            />
            <Typography variant="h4">Descripción del evento</Typography>
            <EditorView />

            <Typography variant="h4">Instrucciones del evento</Typography>
            <EditorView />

            <Typography variant="h4">Imagen del evento</Typography>
            <Paper sx={{ padding: 2 }} elevation={0}>
              <DropZone accept="image/*" label="Arrastra una imagen aqui" />
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Typography variant="h4">Datos del evento</Typography>
            <Paper sx={{ padding: 2 }} elevation={0}>
              <Stack spacing={2}>
                <TextField
                  label="Fecha de inicio"
                  fullWidth
                  type={dateType}
                  onFocus={() => setDateType("date")}
                  onBlur={(e: FocusEvent<HTMLInputElement>) => {
                    if (!e.target.value) {
                      setDateType("text");
                    }
                  }}
                />
                <TextField
                  label="Duracion del evento"
                  fullWidth
                  type={timeType}
                  onFocus={() => setTimeType("time")}
                  onBlur={(e: FocusEvent<HTMLInputElement>) => {
                    if (!e.target.value) {
                      setTimeType("text");
                    }
                  }}
                />
              </Stack>
            </Paper>
            <Button variant="text">Cancelar</Button>
            <Button variant="contained" size="small">
              Publicar evento
            </Button>
            <Typography variant="h4">Ubicacion</Typography>
            <Paper sx={{ padding: 2 }} elevation={0}>
              <TextField label="Nombre del lugar" fullWidth />
            </Paper>

            <Typography variant="h4">Categoria</Typography>
            <Paper sx={{ padding: 2 }} elevation={0}>
              <DropdownCategories />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventForm;
