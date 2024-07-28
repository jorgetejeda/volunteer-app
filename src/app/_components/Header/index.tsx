import React, { useCallback } from "react";
import Image from "next/image";
import {
  Container,
  Box,
  Paper,
  Menu,
  MenuItem,
  Fade,
  Divider,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import theme from "@/theme";
import Link from "next/link";
import HttpImplementation from "@/core-libraries/http/http.implementation";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";

const loginUser = async (data: { email: string; password: string }) => {
  const http = new HttpImplementation();
  const response = await http.post(
    ServicesInstanceEnum.API_AUTH,
    "/login",
    data,
  );
  return response;
};

const registerUser = async (data: {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
}) => {
  const http = new HttpImplementation();
  const response = await http.post(
    ServicesInstanceEnum.API_AUTH,
    "/register",
    data,
  );
  return response;
};

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = useCallback(async () => {
    const data = await loginUser({
      email: "jorgetejeda0804@gmail.com",
      password: "Teje3000",
    });
    console.log(data);
  }, []);

  const handleRegister = useCallback(async () => {
    const data = await registerUser({
      userName: "dominique",
      email: "dominique@gmail.com",
      password: "Teje3000",
      firstName: "Jorge",
      lastName: "Tejeda",
      gender: "M",
    });
    console.log(data);
  }, []);

  return (
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
            <Box display="flex">
              <Box
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ cursor: "pointer" }}
              >
                <PersonOutlineIcon sx={{ color: theme.palette.primary.main }} />
              </Box>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <Link
                  href="/events/create"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem onClick={handleClose}>Crear eventos</MenuItem>
                </Link>
                <Link
                  href="/events"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem onClick={handleClose}>Mis eventos</MenuItem>
                </Link>
                <MenuItem onClick={handleLogin}>Iniciar sesión</MenuItem>
                <MenuItem onClick={handleRegister}>Registrarse</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
              </Menu>
              <NotificationsNoneIcon
                sx={{ color: theme.palette.primary.main }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
