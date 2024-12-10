"use client";
import React, { useEffect, useState } from "react";
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
import profileService from "@/services/profile/profile.services";
import { Profile, ProfileDto } from "@/core/types/profile";

interface FormProfileDto {
  avatar?: File;
  description: string;
  hobbies: { value: string }[];
  interests: { value: string }[];
}

const INITIAL_STATE: FormProfileDto = {
  avatar: undefined,
  description: "",
  hobbies: [{ value: "" }],
  interests: [{ value: "" }],
};

const ProfileEditPage = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  const { control, handleSubmit, register, setValue } = useForm<FormProfileDto>({
    defaultValues: INITIAL_STATE,
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

  // Obtener datos del perfil al cargar la página
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: profileData, isSucceeded } =
          await profileService.getUserProfile();

        if (!isSucceeded) {
          return;
        }

        setValue("description", profileData.description);
        setValue("hobbies", profileData.hobbies.map((hobby) => ({ value: hobby })));
        setValue("interests", profileData.interests.map((interest) => ({ value: interest })));
        if (profileData.profileImage) {
          setImagePreview(profileData.profileImage); // Imagen actual del perfil
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [setValue]);

  // Manejar el envío del formulario
  const onSubmit = async (data: FormProfileDto) => {
    try {
      const formData: ProfileDto = {
        description: data.description,
        hobbies: data.hobbies.map((hobby) => hobby.value),
        interests: data.interests.map((interest) => interest.value),
      };

      if (data.avatar) {
        formData.avatar = data.avatar;
      }

      await profileService.upsertProfile(formData);
      router.push(`/profile`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box>
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
                src={imagePreview || "/default-avatar.png"} // Usar vista previa si existe
                sx={{ width: 150, height: 150 }}
              />
              <Button variant="outlined" component="label">
                Cargar Imagen
                <input
                  type="file"
                  accept=".jpg, .jpeg"
                  hidden
                  {...register("avatar")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file)); // Actualiza la vista previa
                      setValue("avatar", file); // Asigna el archivo al campo
                    }
                  }}
                />
              </Button>
              <Typography variant="caption" textAlign="center" color="textSecondary" sx={{ mt: 1 }}>
                Por favor, cargue una imagen válida. Solo se aceptan archivos JPEG.
              </Typography>
            </Stack>
          </Grid>

          {/* Columna Derecha - Información del Perfil */}
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
                <Box key={field.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Controller
                    name={`hobbies.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={`Hobby ${index + 1}`}
                        fullWidth
                        variant="outlined"
                        sx={{ mr: 2 }}
                      />
                    )}
                  />
                  <IconButton color="error" onClick={() => removeHobby(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => appendHobby({ value: "" })}
              >
                Añadir Hobby
              </Button>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Campo de Intereses */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Intereses</Typography>
              {interestFields.map((field, index) => (
                <Box key={field.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Controller
                    name={`interests.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={`Interés ${index + 1}`}
                        fullWidth
                        variant="outlined"
                        sx={{ mr: 2 }}
                      />
                    )}
                  />
                  <IconButton color="error" onClick={() => removeInterest(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => appendInterest({ value: "" })}
              >
                Añadir Interés
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Botón para enviar */}
      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Guardar Cambios
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileEditPage;
