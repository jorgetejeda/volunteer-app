"use client";
import React from "react";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { Button } from "@/components";
import { ArrowBack, Save } from "@mui/icons-material";
import theme from "@/theme";

const EventForm = () => {
  const handleCancel = () => {};

  const handleSave = () => {};

  return (
    <Box sx={{ marginTop: 4, marginBottom: 3 }}>
      <Paper elevation={0} sx={{ padding: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <IconButton onClick={handleCancel}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Crear Nuevo Evento</Typography>
          <IconButton onClick={handleSave}>
            <Save />
          </IconButton>
        </Box>

        {/* Formulario */}
        <Grid container spacing={3}>
          {/* Primera columna */}
          <Grid item xs={12} sm={6}>
            {/* Fecha del evento */}
            <TextField
              label="Fecha del evento"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Ubicación del evento"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre del evento"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Duración (en horas)"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          {/* Categoría */}
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth margin="normal" required>
              <InputLabel>Categoría</InputLabel>
              <Select label="Categoría">
                <MenuItem value="forestacion">Reforestación</MenuItem>
                <MenuItem value="responsabilidad-social">
                  Responsabilidad Social
                </MenuItem>
                <MenuItem value="caridad">Caridad</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Descripción del evento */}
          <Grid item xs={12}>
            <TextField
              label="Descripción del evento"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
          </Grid>

          {/* Instrucciones */}
          <Grid item xs={12}>
            <TextField
              label="Instrucciones"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
          </Grid>
        </Grid>

        {/* Botones */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCancel}
            sx={{
              textTransform: "none",
            }}
          >
            Cancelar
          </Button>
          <Box ml={2}>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                background: theme.palette.primary.highlight,
              }}
            >
              Crear Evento
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EventForm;
