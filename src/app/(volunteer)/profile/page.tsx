"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Grid,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Función para simular la carga de datos del usuario desde el backend
const fetchUserProfile = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        profileImage: "https://randomuser.me/api/portraits/men/1.jpg", // Imagen aleatoria de un servicio externo
        description:
          "Soy un desarrollador apasionado por la tecnología y la creación de soluciones innovadoras. Me encanta aprender nuevos lenguajes de programación y colaborar en proyectos interesantes.",
        hobbies: [
          "Leer libros de ciencia ficción",
          "Ciclismo de montaña",
          "Cocinar platos internacionales",
          "Jugar videojuegos",
        ],
        interests: [
          "Inteligencia Artificial",
          "Desarrollo Web",
          "Blockchain",
          "Ciberseguridad",
        ],
      });
    }, 2000); // Simulamos un retraso de 2 segundos
  });
};

const ProfileViewPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [userProfile, setUserProfile] = useState<{
    profileImage: string;
    description: string;
    hobbies: string[];
    interests: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile().then((data: any) => {
      setUserProfile(data);
      setLoading(false);
    });
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const redirectToEditPage = () => {
    router.push(`/profile/1/edit`); // Redirige a la página de edición con el ID correspondiente
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const validateName = (name: string | undefined | null): string | null => {
    if (!name) return "";

    const split = name.split(",");
    if (split.length >= 2) {
      return `${split[1]} ${split[0]}`;
    }

    return name;
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack
              direction="column"
              spacing={2}
              alignItems="center"
              sx={{ height: "100%", justifyContent: "center" }}
            >
              <Avatar
                alt="Profile Image"
                src={userProfile?.profileImage || "/default-avatar.png"}
                sx={{ width: 150, height: 150 }}
              />
              {session && (
                <Typography variant="h6">
                  {validateName(session.user?.name)}
                </Typography>
              )}
              {!userProfile?.profileImage && (
                <Typography variant="body2" color="textSecondary">
                  Aún no has agregado una imagen de perfil.
                </Typography>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Descripción</Typography>
              {userProfile?.description ? (
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {userProfile.description}
                </Typography>
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Aún no has agregado una descripción.
                </Typography>
              )}
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Box>
              <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Hobbies" />
                <Tab label="Intereses" />
              </Tabs>
              <Box>
                {tabValue === 0 && (
                  <List>
                    {userProfile && userProfile?.hobbies.length > 0 ? (
                      userProfile.hobbies.map((hobby, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CircleIcon
                              fontSize="small"
                              sx={{ color: "primary.main" }}
                            />
                          </ListItemIcon>
                          <ListItemText primary={hobby} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Aún no has agregado hobbies.
                      </Typography>
                    )}
                  </List>
                )}
                {tabValue === 1 && (
                  <List>
                    {userProfile && userProfile?.interests.length > 0 ? (
                      userProfile.interests.map((interest, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CircleIcon
                              fontSize="small"
                              sx={{ color: "primary.main" }} // Color primario
                            />
                          </ListItemIcon>
                          <ListItemText primary={interest} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Aún no has agregado intereses.
                      </Typography>
                    )}
                  </List>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={redirectToEditPage}>
          Editar Perfil
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileViewPage;
