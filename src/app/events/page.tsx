import React from "react";
import { Box } from "@mui/material";
import { CardEvent } from "@/components/CardEvent";

export default function Event() {
  return (
    <Box display="flex">
      <CardEvent
        name="Nombre del evento #1"
        date="7/2/2021"
        location="36 Paramount Drive, Raynham MA 276"
      />
    </Box>
  );
}
