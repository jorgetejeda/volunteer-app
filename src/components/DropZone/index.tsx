import { Box, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export const DropZone = ({ accept, label = "Drop image here", maxFiles = 5 }) => {
  const [files, setFiles] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [mainImage, setMainImage] = React.useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setError(null);
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      if (files.length + newFiles.length > maxFiles) {
        setError(`Only ${maxFiles} images are allowed`);
        const validFiles = newFiles.slice(0, maxFiles - files.length);
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...validFiles];
          if (mainImage === null) setMainImage(updatedFiles[0].name);
          return updatedFiles;
        });
      } else {
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...newFiles];
          if (mainImage === null) setMainImage(updatedFiles[0].name);
          return updatedFiles;
        });
      }
    },
  });

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
    if (mainImage === fileName) {
      setMainImage(files.length > 1 ? files[0].name : null);
    }
  };

  const handleMainImageChange = (fileName) => {
    setMainImage(fileName);
  };

  const thumbs = files.map((file) => (
    <label key={file.name}>
      <input
        type="radio"
        name="main-image"
        value={file.name}
        checked={mainImage === file.name}
        onChange={() => handleMainImageChange(file.name)}
        style={{ display: 'none' }}
      />
      <Box
        sx={{
          display: "inline-flex",
          position: "relative",
          borderRadius: 1,
          border: mainImage === file.name ? "2px solid blue" : "1px solid #eaeaea",
          marginBottom: 2,
          marginRight: 2,
          width: 100,
          height: 100,
          padding: 1,
          boxSizing: "border-box",
          cursor: 'pointer'
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
            src={file.preview}
            alt="preview"
            onLoad={() => URL.revokeObjectURL(file.preview)}
          />
        </Box>
      </Box>
    </label>
  ));

  React.useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Box className="container">
      <Box {...getRootProps()}>
        <Typography variant="h5">{label}</Typography>
        <input {...getInputProps({ className: "dropzone" })} />
        <Typography variant="body2">or click to select image</Typography>
      </Box>
      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
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
    </Box>
  );
};

