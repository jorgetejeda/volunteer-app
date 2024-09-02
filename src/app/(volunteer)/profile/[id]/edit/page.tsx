'use client'
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Paper,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

type FormData = {
  profileImage: FileList | null;
  description: string;
  hobbies: { value: string }[];
  interests: { value: string }[];
};

const ProfileEditPage = () => {
  const router = useRouter();

  const { control, handleSubmit, register, setValue } = useForm<FormData>({
    defaultValues: {
      profileImage: null,
      description: "",
      hobbies: [{ value: "" }],
      interests: [{ value: "" }],
    },
  });

  const {
    fields: hobbyFields,
    append: appendHobby,
    remove: removeHobby,
  } = useFieldArray({
    control,
    name: "hobbies",
  });

  const {
    fields: interestFields,
    append: appendInterest,
    remove: removeInterest,
  } = useFieldArray({
    control,
    name: "interests",
  });

  const onSubmit = (data: FormData) => {
    console.log("Datos enviados: ", data);
    // Aquí deberías manejar la lógica de envío de los datos al backend
    router.push(`/profile/1`); // Redirige a la vista del perfil después de guardar los cambios
  };

  return (
    <Box>
      {/* Formulario de Edición de Perfil */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Columna Izquierda - Imagen de Perfil */}
          <Grid item xs={12} md={4}>
            <Stack
              direction="column"
              spacing={2}
              alignItems="center"
              sx={{ height: "100%", justifyContent: "center" }}
            >
              <Typography variant="subtitle1">Foto de Perfil</Typography>
              <Avatar
                alt="Profile Image"
                src="/default-avatar.png" 
                sx={{ width: 150, height: 150 }}
              />
              <Button variant="outlined" component="label">
                Cargar Imagen
                <input
                  type="file"
                  accept=".jpg, .jpeg" 
                  hidden
                  {...register("profileImage")}
                  onChange={(e) =>
                    setValue("profileImage", e.target.files ? e.target.files : null)
                  }
                />
              </Button>
              <Typography variant="caption" textAlign="center" color="textSecondary" sx={{ mt: 1 }}>
                Por favor, sea responsable con el tipo de imagen que cargue, ya que está relacionado con el trabajo.
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Descripción</Typography>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descripción"
                    multiline
                    fullWidth
                    rows={4}
                    variant="outlined"
                    sx={{ mt: 2, borderRadius: 1 }}
                  />
                )}
              />
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Campo de Hobbies */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Hobbies</Typography>
              {hobbyFields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{ display: "flex", alignItems: "center", mt: 2 }}
                >
                  <TextField
                    {...register(`hobbies.${index}.value`)}
                    variant="outlined"
                    placeholder="Escribe un hobbie"
                    fullWidth
                    required
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeHobby(index)}
                    disabled={hobbyFields.length === 1} // No permitir eliminar si hay solo uno
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => appendHobby({ value: "" })}
                sx={{ mt: 2 }}
              >
                Agregar Hobbie
              </Button>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Campo de Intereses */}
            <Box>
              <Typography variant="h6">Intereses</Typography>
              {interestFields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{ display: "flex", alignItems: "center", mt: 2 }}
                >
                  <TextField
                    {...register(`interests.${index}.value`)}
                    variant="outlined"
                    placeholder="Escribe un interés"
                    fullWidth
                    required
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeInterest(index)}
                    disabled={interestFields.length === 1} // No permitir eliminar si hay solo uno
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => appendInterest({ value: "" })}
                sx={{ mt: 2 }}
              >
                Agregar Interés
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Botón de Enviar alineado a la derecha */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Guardar Cambios
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileEditPage;
