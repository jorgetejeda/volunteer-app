import React, { useCallback, useEffect, useLayoutEffect } from "react";
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
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/store/auth/AuthContext";

export const Header = () => {
  // const { data: session, status } = useSession();
  const { isAdmin, isAuthenticated, logout } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

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

            {isAuthenticated && <Box display="flex">
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
                {isAdmin && (
                  <Link
                    href="/panel/event/create"
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem onClick={handleClose}>Crear eventos</MenuItem>
                  </Link>
                )}

                <Link
                  href="/events"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem onClick={handleClose}>Mis eventos</MenuItem>
                </Link>
                <Box>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </Box>
              </Menu>
              {/* <NotificationsNoneIcon
                sx={{ color: theme.palette.primary.main }}
              /> */}
            </Box>}

          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
