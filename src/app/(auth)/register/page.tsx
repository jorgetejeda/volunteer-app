"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
//@Styles
import theme from "@/theme";
import styled from "@emotion/styled";
//Components
import {
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  IconButton,
  InputAdornment, // Importar CircularProgress para el indicador de carga
} from "@mui/material";
import Image from "next/image";
//@Navigation
import { useRouter } from "next/navigation";
import { RegisterUser } from "@/core/types";
import { AuthService } from "@/services";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface FormValues {
  name: string;
  emailDomain: string;
  password: string;
  confirmPassword: string;
  username: string;
}

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

const requirementStyles = {
  notMet: {
    color: "gray",
  },
  met: {
    color: "green",
  },
};

export default function Register() {
  const router = useRouter();
  const { control, handleSubmit, watch, setError, clearErrors, formState } =
    useForm({
      mode: "onBlur",
      defaultValues: {
        name: "",
        username: "",
        emailDomain: "afpcrecer.com.do",
        password: "",
        confirmPassword: "",
      },
    });
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    letter: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para confirmar contraseña

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  useEffect(() => {
    const validations = validatePassword(password);
    if (Object.values(validations).every(Boolean)) {
      clearErrors("password");
    } else {
      setError("password", {
        type: "manual",
        message: "La contraseña no cumple con todos los requisitos",
      });
    }
  }, [clearErrors, password, setError]);

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Las contraseñas no coinciden",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [password, confirmPassword, setError, clearErrors]);

  const validatePassword = (password: string) => {
    const validations = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      letter: /[a-z]/.test(password),
    };
    setPasswordValidations(validations);
    return validations;
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true); // Iniciar carga
    const { username, emailDomain, password, name } = data;
    const fullEmail = `${username}@${emailDomain}`;

    const payload: RegisterUser = {
      name,
      email: fullEmail,
      password,
    };

    const { isSucceeded } = await AuthService.register(payload);

    if (!isSucceeded) {
      setLoading(false);
      return;
    }

    setOpenDialog(true);
    setLoading(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    router.push("/login");
  };

  const passwordsMatch = password === confirmPassword;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Grid item>
          <Image
            src="/assets/Logo_voluntariado.svg"
            alt="Logo"
            width={214}
            height={64}
            priority
          />
        </Grid>
        <Grid item container spacing={2} marginTop={8}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El nombre es obligatorio" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Campo de Usuario + Dropdown de Correo */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El usuario es obligatorio" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Usuario"
                        variant="outlined"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="emailDomain"
                    control={control}
                    defaultValue="afpcrecer.com.do"
                    render={({ field }) => (
                      <TextField {...field} select variant="outlined" fullWidth>
                        <MenuItem value="afpcrecer.com.do">
                          afpcrecer.com.do
                        </MenuItem>
                        <MenuItem value="seguroscrecer.com">
                          seguroscrecer.com
                        </MenuItem>
                        <MenuItem value="creciendoseguros.com.do">
                          creciendoseguros.com.do
                        </MenuItem>
                        <MenuItem value="crecerlab.com">
                        crecerlab.com
                        </MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Campos de Contraseña */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "La contraseña es obligatoria",
                      validate: validatePassword as any,
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        value={password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Confirmar la contraseña es obligatorio",
                      validate: (value) =>
                        value === watch("password") ||
                        "Las contraseñas no coinciden",
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Confirmar Contraseña"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid
                    container
                    direction="column"
                    spacing={1}
                    textAlign="left"
                  >
                    <Grid item>
                      <Typography
                        style={
                          passwordValidations.length
                            ? requirementStyles.met
                            : requirementStyles.notMet
                        }
                      >
                        - Debe tener mínimo 6 caracteres
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        style={
                          passwordValidations.uppercase
                            ? requirementStyles.met
                            : requirementStyles.notMet
                        }
                      >
                        - Debe tener una mayúscula
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        style={
                          passwordValidations.number
                            ? requirementStyles.met
                            : requirementStyles.notMet
                        }
                      >
                        - Debe tener un número
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        style={
                          passwordValidations.letter
                            ? requirementStyles.met
                            : requirementStyles.notMet
                        }
                      >
                        - Debe tener una letra
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Botón de Registrarse */}
                <Grid item xs={12}>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={
                      !Object.values(passwordValidations).every(Boolean) ||
                      !passwordsMatch ||
                      loading // Deshabilitar el botón mientras se carga
                    }
                  >
                    {loading ? <CircularProgress size={24} /> : "Registrarse"}{" "}
                    {/* Mostrar indicador de carga */}
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>

      {/* Diálogo de éxito */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Registro Exitoso</DialogTitle>
        <DialogContent>
          <Typography>¡Te has registrado exitosamente!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Ir al Inicio de Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
