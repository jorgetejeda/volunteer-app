"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { EventService } from "@/services";
import { useParams } from "next/navigation";
import { Users } from "@/core/types";
import { BackButton, LoadingBackdrop } from "@/app/_components";

const AttendancePage = () => {
  const { id: eventId } = useParams(); // Obtener el ID del evento desde la URL
  const [users, setUsers] = useState<Users[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [userToRemove, setUserToRemove] = useState<Users | null>(null);
  const [eventName, setEventName] = useState<string>("Evento de Prueba");
  const [toggleEventDialog, setToggleEventDialog] = useState<boolean>(false);
  const [isEventOpen, setIsEventOpen] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data, isSucceeded } =
        await EventService.getAllUserEnrolledEvents(+eventId);
      if (!isSucceeded || !data) {
        console.log("Error al obtener los usuarios");
      }
      setEventName(data.event);
      const users = data.users.map((user) => ({ ...user, submitted: false }));
      setUsers(users);
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
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

  const handleSendAttendance = async () => {
    if (selectedUsers.size === 0) {
      console.log("No users selected.");
      return;
    }

    const userIds = Array.from(selectedUsers);

    const payload = {
      userId: userIds,
      attended: true,
    };

    try {
      await EventService.markBulkAttendance(+eventId, payload);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.has(user.id)
            ? { ...user, attended: true, submitted: true }
            : user,
        ),
      );

      setSelectedUsers(new Set());

      console.log("Attendance marked successfully.");
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const handleMarkAttendance = async (userId: string) => {
    await EventService.markAttendance(+eventId, { userId, attended: true });
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, attended: true, submitted: true }
          : user,
      ),
    );
  };

  const handleRemoveAttendance = async (userId: string) => {
    await EventService.markAttendance(+eventId, { userId, attended: false });
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, attended: false, submitted: false }
          : user,
      ),
    );
    setDialogOpen(false);
  };

  const handleCheckboxChange = (userId: string) => {
    handleUserClick(userId);
  };

  const confirmRemoveAttendance = (user: Users) => {
    setUserToRemove(user);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setUserToRemove(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggleEventDialog = () => {
    setToggleEventDialog((prev) => !prev);
  };

  const handleToggleEventStatus = async () => {
    try {
      // await EventService.endEvent(+eventId);
      console.log("Evento culminado con éxito.");
      setIsEventOpen((prev) => !prev); // Cambia el estado del evento
      setToggleEventDialog(false); // Cierra el diálogo
    } catch (error) {
      console.error("Error al culminar el evento:", error);
    }
  };

  if (loading) return <LoadingBackdrop open={loading} />;

  return (
    <Box>
      <Box justifyContent="space-between" alignItems="center" display="flex">
        <BackButton />
        <Button
          variant="contained"
          color="primary"
          onClick={handleToggleEventDialog}
        >
          {isEventOpen ? "Culminar evento" : "Reabrir evento"}
        </Button>
      </Box>

      <Typography variant="h1" component="h1" gutterBottom marginTop={2}>
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
              {/* <TableCell>Foto</TableCell> */}
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
                    disabled={user.submitted || user.attended}
                  />
                </TableCell>
                {/* <TableCell>
                  <Image
                    src={user.image || "/default-image.png"}
                    alt={user.name}
                    style={{ width: "50px", borderRadius: "50%" }}
                  />
                </TableCell> */}
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.submitted || user.attended
                    ? "Asistencia marcada"
                    : "No marcada"}
                </TableCell>
                <TableCell>
                  {user.submitted || user.attended ? (
                    <Tooltip title="Quitar asistencia">
                      <IconButton
                        onClick={() => confirmRemoveAttendance(user)}
                        color="primary"
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Marcar asistencia">
                      <IconButton onClick={() => handleMarkAttendance(user.id)}>
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

      <Dialog open={toggleEventDialog} onClose={handleToggleEventDialog}>
        <DialogTitle>
          {isEventOpen
            ? "Confirmar culminación del evento"
            : "Confirmar reapertura del evento"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEventOpen
              ? `¿Estás seguro de que deseas culminar el evento "${eventName}"?`
              : `¿Estás seguro de que deseas reabrir el evento "${eventName}"?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleToggleEventDialog}
            variant="outlined"
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleToggleEventStatus}
            variant="contained"
            color="primary"
            autoFocus
          >
            {isEventOpen ? "Culminar evento" : "Reabrir evento"}
          </Button>
        </DialogActions>
      </Dialog>
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
          <Button
            variant="outlined"
            onClick={handleDialogClose}
            color="primary"
          >
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
