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
import profileService from "@/services/profile/profile.services";
import { Profile } from "@/core/types/profile";

const ProfileViewPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {

      const { data, isSucceeded } = await profileService.getUserProfile();
      if (isSucceeded) {
        setUserProfile(data as Profile);
      }
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const redirectToEditPage = () => {
    router.push(`/profile/edit`); 
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
        {loading && <CircularProgress />}
        {!loading && <Grid container spacing={4}>
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
        </Grid>}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" color="primary" disabled={loading} onClick={redirectToEditPage}>
          Editar Perfil
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileViewPage;
