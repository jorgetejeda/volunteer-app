import React, { useState } from "react";
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  Circle as CircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

import { MuiColorInput } from "mui-color-input";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components";

// Define el tipo para una categoría
interface Category {
  name: string;
  color: string;
}

interface FormValues {
  name: string;
  color: string;
}

export const DropdownCategories: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryColor, setCategoryColor] = useState<string>("#000000");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleAddCategory: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const updatedCategories =
        editIndex !== null
          ? categories.map((category, index) =>
              index === editIndex
                ? { name: data.name, color: data.color }
                : category,
            )
          : [...categories, { name: data.name, color: data.color }];

      // Simulación de llamada al backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setCategories(updatedCategories);
      setEditIndex(null);
      setShowForm(false);
      reset();
    } catch (error) {
      console.error("Error al guardar la categoría", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (deleteIndex !== null) {
      setLoading(true);
      try {
        // Simulación de llamada al backend
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setCategories(categories.filter((_, i) => i !== deleteIndex));
        setDeleteIndex(null);
        setOpenDialog(false);
      } catch (error) {
        console.error("Error al eliminar la categoría", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCategory = (index: number) => {
    const category = categories[index];
    setValue("name", category.name);
    setCategoryColor(category.color);
    setValue("color", category.color);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleColorChange = (color: string) => {
    setCategoryColor(color);
    setValue("color", color);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setCategoryColor("#000000");
    setEditIndex(null);
    reset();
  };

  return (
    <Box>
      {categories.length > 0 && (
        <List sx={{ marginBottom: 1 }}>
          {categories.map((category, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <CircleIcon sx={{ color: category.color, marginRight: 1 }} />
                <ListItemText primary={category.name} />
              </Box>
              <Box>
                <IconButton onClick={() => handleEditCategory(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setDeleteIndex(index);
                    setOpenDialog(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      <Link component="button" variant="body1" onClick={toggleForm}>
        Agregar una categoria
      </Link>
      {showForm && (
        <Box
          component="form"
          onSubmit={handleSubmit(handleAddCategory)}
          sx={{ marginTop: 2 }}
        >
          <TextField
            fullWidth
            label="Nombre de la categoria"
            {...register("name", {
              required: "El nombre de la categoría es obligatorio",
            })}
            sx={{ marginBottom: 2 }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <MuiColorInput
              fullWidth
              value={categoryColor}
              onChange={(color) => handleColorChange(color)}
              format="hex"
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} />
              ) : editIndex !== null ? (
                "Actualizar"
              ) : (
                "Agregar"
              )}
            </Button>
            <Button variant="text" onClick={toggleForm}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si eliminas esta categoría, todos los eventos relacionados a dicha
            categoría estarán mostrando un estatus de "sin categoría". ¿Estás
            seguro de que quieres realizar esto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleDeleteCategory}
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
