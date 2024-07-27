
import React, { useState } from "react";
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Stack,
  Checkbox,
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
  id: number; // Mantener como número
  title: string;
  color: string;
}

interface FormValues {
  title: string;
  color: string;
}

interface DropdownCategoriesProps {
  onChange: (categoryId: number) => void; // Cambiado a número
}

export const DropdownCategories: React.FC<DropdownCategoriesProps> = ({
  onChange,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryColor, setCategoryColor] = useState<string>("#000000");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Cambiado a número

  const {
    register,
    handleSubmit: handleCategorySubmit,
    setValue,
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
                ? { ...category, title: data.title, color: data.color }
                : category,
            )
          : [
              ...categories,
              { id: Date.now(), title: data.title, color: data.color }, // Cambiado a número
            ];

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
    setValue("title", category.title);
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

  const handleCategorySelect = (categoryId: number) => { // Cambiado a número
    setSelectedCategoryId(categoryId);
    onChange(categoryId);
  };

  return (
    <Box>
      {categories.length > 0 && (
        <List sx={{ marginBottom: 1 }}>
          {categories.map((category, index) => (
            <ListItem
              key={category.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 0,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={selectedCategoryId === category.id}
                  onChange={() => handleCategorySelect(category.id)}
                />
                <CircleIcon sx={{ color: category.color, marginRight: 1 }} />
                <ListItemText primary={category.title} />
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
      <Button variant="text" onClick={toggleForm}>
        Agregar una categoría
      </Button>
      {showForm && (
        <Box sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            label="Nombre de la categoría"
            {...register("title", {
              required: "El nombre de la categoría es obligatorio",
            })}
            sx={{ marginBottom: 2 }}
            error={!!errors.title}
            helperText={errors.title?.message}
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
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleCategorySubmit(handleAddCategory)}
            >
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
            categoría estarán mostrando un estatus de (sin categoría). ¿Estás
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
