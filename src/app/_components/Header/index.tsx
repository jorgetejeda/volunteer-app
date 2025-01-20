'use client'
import React from "react";
import Image from "next/image";
import {
  Container,
  Box,
  Paper,
  Menu,
  MenuItem,
  Fade,
  Divider,
  Avatar,
  IconButton,
  ListItemIcon,
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import ReportIcon from "@mui/icons-material/Assessment";

import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_FILES_API}/profile`;

export const Header = () => {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [agreedTermsModal, setAgreedTermsModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [agreed, setAgreed] = React.useState(false);

  // Mostrar el diálogo si el usuario no ha aceptado los términos
  React.useEffect(() => {
    if (session && session.token && !sessionStorage.getItem("token")) {
      sessionStorage.setItem("token", session.token);
    }

    // Verifica si el usuario ha aceptado los términos
    if (session && !session.agreedTerms) {
      setAgreedTermsModal(true);
    }
  }, [session, status]);

  const avatar = React.useMemo(() => {
    return `${BASE_URL}/${session?.profileImage}` || session?.user?.image || "/default-avatar.png";
  }, [session]);

  const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  };

  const handleAcceptTerms = async () => {
    setLoading(true); // Activar el estado de carga
    try {
      // Simular llamada al backend
      await simulateAcceptTerms();
      setAgreedTermsModal(false); // Cerrar el diálogo una vez que se aceptan los términos
      setLoading(false); // Desactivar el estado de carga
      console.log("Términos aceptados y guardados en el backend.");
    } catch (error) {
      setError(
        "Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.",
      ); // Establecer mensaje de error
      setLoading(false); // Desactivar el estado de carga
    }
  };

  const handleCloseDialog = () => {
    if (!loading) {
      setAgreedTermsModal(false);
    }
  };

  const simulateAcceptTerms = async () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // Simulación de éxito o fracaso aleatorio
        if (success) {
          console.log("Simulación de llamada al backend para aceptar términos");
          resolve();
        } else {
          reject(new Error("Fallo en la llamada al backend."));
        }
      }, 2000); // Simulamos un retraso de 2 segundos
    });
  };

  const handleRetry = () => {
    setError(null); // Limpiar el mensaje de error
    handleAcceptTerms(); // Reintentar la solicitud
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    router.push("/logout");
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box component="header" sx={{ marginTop: 4, marginBottom: 3 }}>
          <Paper
            sx={{
              padding: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link href="/" passHref>
                <Image
                  src="/assets/Logo_voluntariado.svg"
                  alt="Logo"
                  width={144}
                  height={40}
                  priority
                />
              </Link>

              {session && session?.token && (
                <Box display="flex" alignItems="center">
                  <IconButton
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ marginRight: 2 }}
                  >
                    <Avatar
                      alt="User Avatar"
                      sx={{ width: 32, height: 32 }}
                      src={avatar} // Default avatar if no user image
                    />
                  </IconButton>

                  {/* Menu */}
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Link
                      href="/profile"
                      passHref
                      style={{ textDecoration: "none" }}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <PersonOutlineIcon />
                        </ListItemIcon>
                        Mi perfil
                      </MenuItem>
                    </Link>

                    <Link
                      href="/events"
                      passHref
                      style={{ textDecoration: "none" }}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <EventIcon />
                        </ListItemIcon>
                        Mis eventos
                      </MenuItem>
                    </Link>
                    <Divider />
                    {session?.isAdmin && (
                      <>
                        <Link
                          href="/panel/event/create"
                          passHref
                          style={{ textDecoration: "none" }}
                        >
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <CreateIcon />
                            </ListItemIcon>
                            Crear eventos
                          </MenuItem>
                        </Link>

                        <Link
                          href="/reports"
                          passHref
                          style={{ textDecoration: "none" }}
                        >
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <ReportIcon />
                            </ListItemIcon>
                            Reportes
                          </MenuItem>
                        </Link>
                      </>
                    )}

                    <Box>
                      <Divider />
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        Cerrar sesión
                      </MenuItem>
                    </Box>
                  </Menu>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
      <Dialog
        open={false}
        onClose={() => {}}
        disableEscapeKeyDown
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "80%", // Ajuste de tamaño al 80% de la pantalla
            maxHeight: "80vh", // Ajuste de altura máxima
          },
        }}
      >
        <DialogTitle>
          Términos y Condiciones
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            disabled={loading} // Desactivar el botón de cerrar durante la carga
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Contenido con scroll para los términos y condiciones */}
          <Box sx={{ maxHeight: "60vh", overflow: "auto" }}>
            <DialogContentText>
              {/* Términos y Condiciones de ejemplo */}
              <b>Bienvenido a nuestra aplicación.</b> Estos términos y
              condiciones establecen las reglas y regulaciones para el uso de
              nuestro servicio.
              <br />
              <br />
              <b>Aceptación de los Términos:</b> Al acceder a esta aplicación,
              asumimos que acepta estos términos y condiciones en su totalidad.
              No continúe utilizando la aplicación si no acepta todos los
              términos y condiciones establecidos en esta página.
              <br />
              <br />
              {/* (Contenido adicional de los términos y condiciones) */}
              <br />
              **Última actualización:** 1 de Septiembre de 2024.
            </DialogContentText>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={handleAgreeChange}
                name="agreed"
                color="primary"
              />
            }
            label="Acepto los términos y condiciones."
          />
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseDialog} disabled={loading}>
            Cerrar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAcceptTerms}
            disabled={!agreed || loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(error)}
        onClose={() => setError(null)}
        disableEscapeKeyDown
      >
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(null)} variant="text">
            Cerrar
          </Button>
          <Button onClick={handleRetry} color="primary" variant="contained">
            Reintentar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
