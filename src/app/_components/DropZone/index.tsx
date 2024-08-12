import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";
import { FieldError } from "react-hook-form";
import { EventImage } from "@/core/types";

interface DropZoneProps {
  accept: Accept;
  label?: string;
  hint?: string;
  maxFiles?: number;
  error?: FieldError;
  setValue: (name: string, value: File[] | string) => void;
  clearErrors: (name?: string) => void;
  defaultValues?: EventImage[] | null;
  main?: string | null;
}

export const DropZone: React.FC<DropZoneProps> = ({
  accept,
  label = "Drop image here",
  hint,
  maxFiles = 5,
  error: mainImageError,
  setValue,
  clearErrors,
  defaultValues,
  main,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<EventImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (defaultValues && defaultValues.length > 0) {
      setPreviewImages(defaultValues);
      setMainImage(main);
    }
    setLoading(false); // Configuración completada, desactivar estado de carga
  }, [defaultValues, main]);

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: (acceptedFiles: File[]) => {
      setError(null);
      clearErrors("images");

      const totalImages =
        previewImages.length + files.length + acceptedFiles.length;

      if (totalImages > maxFiles) {
        setError(`Solo puedes agregar un máximo de ${maxFiles} imágenes.`);
        return;
      }

      const validFiles = acceptedFiles.slice(0, maxFiles - files.length);
      
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...validFiles];
        console.log("updatedFiles", updatedFiles[0]);
        if (!mainImage && updatedFiles.length > 0) {
          setMainImage(updatedFiles[0].name);
          setValue("mainImage", updatedFiles[0].name);
        }
        setValue("images", updatedFiles);
        return updatedFiles;
      });
    },
  });

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.name !== fileName);
      setValue("images", updatedFiles);
      if (mainImage === fileName) {
        const newMainImage =
          updatedFiles.length > 0 ? updatedFiles[0].name : null;
        setMainImage(newMainImage);
        setValue("mainImage", newMainImage!);
      }
      return updatedFiles;
    });
  };

  const removePreviewImage = useCallback(
    (fileName: string) => {
      setPreviewImages((prevImages) => {
        const updatedImages: EventImage[] = prevImages.filter(
          (image) => image.documentName !== fileName
        );
        setValue("currentImages", updatedImages as any);
        if (mainImage === fileName) {
          const newMainImage = files.length > 0 ? files[0].name : null;
          setMainImage(newMainImage);
          setValue("mainImage", newMainImage!);
        }
        return updatedImages;
      });
    },
    [files, mainImage, setValue]
  );

  const handleMainImageChange = useCallback(
    (fileName: string) => {
      setMainImage(fileName);
      setValue("mainImage", fileName);
    },
    [setValue]
  );

  const previewThumbs = useMemo(
    () =>
      previewImages.map((file) => {
        console.log(
          mainImage,
          file.documentName,
          mainImage === file.documentName
        );

        return (
          <label key={file.documentName}>
            <input
              type="radio"
              name="main-image"
              value={file.documentName}
              checked={mainImage === file.documentName}
              onChange={() => handleMainImageChange(file.documentName)}
              style={{ display: "none" }}
            />
            <Box
              sx={{
                display: "inline-flex",
                position: "relative",
                borderRadius: 1,
                border:
                  mainImage === file.documentName
                    ? "2px solid blue"
                    : "1px solid #eaeaea",
                marginBottom: 2,
                marginRight: 2,
                width: 100,
                height: 100,
                padding: 1,
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  removePreviewImage(file.documentName);
                }}
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                }}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  minWidth: 0,
                  overflow: "hidden",
                  flexDirection: "column",
                }}
              >
                <Image
                  width={100}
                  height={100}
                  layout="responsive"
                  src={file.documentUrl}
                  alt="preview"
                />
              </Box>
            </Box>
          </label>
        );
      }),
    [handleMainImageChange, mainImage, previewImages, removePreviewImage]
  );

  const thumbs = files.map((file) => (
    <label key={file.name}>
      <input
        type="radio"
        name="main-image"
        value={file.name}
        checked={mainImage === file.name}
        onChange={() => handleMainImageChange(file.name)}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          display: "inline-flex",
          position: "relative",
          borderRadius: 1,
          border:
            mainImage === file.name ? "2px solid blue" : "1px solid #eaeaea",
          marginBottom: 2,
          marginRight: 2,
          width: 100,
          height: 100,
          padding: 1,
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            removeFile(file.name);
          }}
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            minWidth: 0,
            overflow: "hidden",
            flexDirection: "column",
          }}
        >
          <Image
            width={100}
            height={100}
            layout="responsive"
            src={URL.createObjectURL(file)}
            alt="preview"
            onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
          />
        </Box>
      </Box>
    </label>
  ));

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [files]);

  return (
    <Box
      sx={{
        borderColor: error || mainImageError?.message ? "red" : "transparent",
      }}
    >
      <Box {...getRootProps()} sx={{ cursor: "pointer" }}>
        <input {...getInputProps({ className: "dropzone" })} />
        <Typography variant="h5">{label}</Typography>
        {hint && (
          <Typography variant="body2">
            {hint} (máximo {maxFiles})
          </Typography>
        )}
      </Box>
      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 2,
            }}
          >
            {thumbs}
          </Box>

          {!!thumbs.length && <Divider sx={{ margin: "16px 0" }} />}

          {/* Preview thumbs */}
          {previewImages.length > 0 && (
            <Box>
              <Typography variant="h6">Imágenes actuales</Typography>
              <Stack direction="row">
                {previewThumbs}
              </Stack>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
