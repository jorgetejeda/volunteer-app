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
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import ReportIcon from "@mui/icons-material/Assessment";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

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
                    src={session.user?.image || "/default-avatar.png"} // Default avatar if no user image
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
  );
};
