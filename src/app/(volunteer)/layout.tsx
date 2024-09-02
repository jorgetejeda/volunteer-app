"use client";
import * as React from "react";
// Components
import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Header, Footer } from "@components/index";
import { useSession } from "next-auth/react";

export default function EventLayout(props: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [open, setOpen] = React.useState(false);
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
      setOpen(true);
    }
  }, [session, status]);

  const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  };

  const handleAcceptTerms = async () => {
    setLoading(true); // Activar el estado de carga
    try {
      // Simular llamada al backend
      await simulateAcceptTerms();
      setOpen(false); // Cerrar el diálogo una vez que se aceptan los términos
      setLoading(false); // Desactivar el estado de carga
      console.log("Términos aceptados y guardados en el backend.");
    } catch (error) {
      setError("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde."); // Establecer mensaje de error
      setLoading(false); // Desactivar el estado de carga
    }
  };

  const handleCloseDialog = () => {
    if (!loading) {
      setOpen(false);
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "auto",
        }}
      >
        {props.children}
      </Container>
      <Footer />

      {/* Dialogo para Términos y Condiciones */}
      <Dialog
        open={open}
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
          <Button
            variant="text"
            onClick={handleCloseDialog}
            disabled={loading}
          >
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
    </Box>
  );
}
