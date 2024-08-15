"use client";
import React, { useEffect, useState } from "react";
//@Styles
import theme from "@/theme";
import styled from "@emotion/styled";
//Components
import {
  Container,
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
//@Navigation
import { useRouter } from "next/navigation";
//@Providers
import { useAuthContext } from "@/store/auth/AuthContext";
import { AuthService } from "@/services";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const CenteredBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  textAlign: "center",
});

const CustomButton = styled(Button)({
  backgroundColor: "#fff",
  border: "2px solid #e2e8f0",
  padding: "1rem",
  borderRadius: "2rem",
  "&.MuiButton-contained": {
    color: "#1E293B",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export default function LogIn() {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, setUser, setIsAdmin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      setLoading(true);
      const { data: user, isSucceeded } = await AuthService.register({ email, password });

      if (!isSucceeded) {
        throw new Error('Error al iniciar sesión');
      }

      setUser(user.name);
      setIsAuthenticated(true);
      user.userRoles.forEach((role) => {
        if (role.role.title === 'Admin') {
          setIsAdmin(true);
          sessionStorage.setItem('isAdmin', 'true');
        } else {
          setIsAdmin(false);
          sessionStorage.setItem('isAdmin', 'false');
        }
      });

      sessionStorage.setItem('token', user.token);
      sessionStorage.setItem('name', user.name);
      router.push("/");
    } catch (error) {
      console.log(error);
      setErrorMessage("Usuario o contraseña incorrectos");
      setOpenErrorDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/register"); // Redirige a la pantalla de registro
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <CenteredBox>
        <Image
          src="/assets/Logo_voluntariado.svg"
          alt="Logo"
          width={214}
          height={64}
          priority
        />
        <Box marginTop={8} width="100%">
          <Stack spacing={2}>
            {/* Formulario de Inicio de Sesión */}
            <form onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <CustomButton
                  type="submit" // Cambiar el tipo a "submit"
                  variant="contained"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={24} /> : "Iniciar Sesión"}
                </CustomButton>
              </Stack>
            </form>

            <Typography variant="body2" color={theme.palette.text.primary} marginTop={1}>
              ¿No tienes una cuenta?{" "}
              <Box
                component="a"
                href="#"
                sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
                onClick={handleRegister}
              >
                Crea una aquí
              </Box>
            </Typography>
          </Stack>
        </Box>
      </CenteredBox>

      {/* Diálogo de Error */}
      <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
