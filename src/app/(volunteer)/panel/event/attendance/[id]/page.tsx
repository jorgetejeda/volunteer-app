"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
  Checkbox,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

type User = {
  id: string;
  name: string;
  photo: string;
  attended: boolean;
  submitted: boolean;
};

const AttendancePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [userToRemove, setUserToRemove] = useState<User | null>(null);

  const eventName = "Evento de Prueba";

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const fetchUsers = async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "1", name: "Juan Pérez", photo: "https://randomuser.me/api/portraits/men/1.jpg", attended: false, submitted: false },
          { id: "2", name: "Ana Gómez", photo: "https://randomuser.me/api/portraits/women/2.jpg", attended: false, submitted: false },
          { id: "3", name: "Carlos Ruiz", photo: "https://randomuser.me/api/portraits/men/3.jpg", attended: false, submitted: false },
          { id: "4", name: "María López", photo: "https://randomuser.me/api/portraits/women/4.jpg", attended: false, submitted: false },
        ]);
      }, 1000);
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleUserClick = (userId: string) => {
    setSelectedUsers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(userId)) {
        newSelected.delete(userId);
      } else {
        newSelected.add(userId);
      }
      return newSelected;
    });
  };

  const handleSendAttendance = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        selectedUsers.has(user.id)
          ? { ...user, attended: true, submitted: true }
          : user
      )
    );
    setSelectedUsers(new Set());
  };

  const handleMarkAttendance = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, attended: true, submitted: true } : user
      )
    );
  };

  const handleRemoveAttendance = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, attended: false, submitted: false } : user
      )
    );
    setDialogOpen(false);
  };

  const handleCheckboxChange = (userId: string) => {
    handleUserClick(userId);
  };

  const confirmRemoveAttendance = (user: User) => {
    setUserToRemove(user);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setUserToRemove(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      {/* Título del Evento */}
      <Typography variant="h4" gutterBottom>
        {eventName}
      </Typography>

      {/* Componente de Búsqueda */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <TextField
          label="Buscar usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleSearchChange}
          value={searchTerm}
        />
      </Paper>

      {/* Vista de Tabla */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Seleccionar</TableCell>
              <TableCell>Foto</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Asistencia</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.has(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                    disabled={user.submitted}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={user.photo}
                    alt={user.name}
                    style={{ width: "50px", borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.submitted ? "Asistencia marcada" : "No marcada"}
                </TableCell>
                <TableCell>
                  {user.submitted ? (
                    <Tooltip title="Quitar asistencia">
                      <IconButton
                        onClick={() => confirmRemoveAttendance(user)}
                        color="error"
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Marcar asistencia">
                      <IconButton
                        onClick={() => handleMarkAttendance(user.id)}
                        color="primary"
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botón para Enviar Asistencia */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendAttendance}
          disabled={selectedUsers.size === 0}
        >
          Enviar Asistencia
        </Button>
      </Box>

      {/* Paginación */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredUsers.length / 10)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>

      {/* Diálogo de Confirmación */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres quitar la asistencia a{" "}
            <strong>{userToRemove?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemoveAttendance(userToRemove!.id)}
            color="primary"
            autoFocus
          >
            Quitar asistencia
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AttendancePage;
