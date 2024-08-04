import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
interface DataNotFoundProps {
  message?: string;
}

export const DataNotFound: React.FC<DataNotFoundProps> = ({ message }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    sx={{ color: "gray", textAlign: "center" }}
  >
    <ErrorOutlineIcon sx={{ fontSize: 40, marginBottom: 1 }} />
    <Typography variant="body1">
      {message || "No se encontraron datos"}
    </Typography>
  </Box>
);
