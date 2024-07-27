import React from "react";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
// Icons
import { LocationOnOutlined, CalendarMonthOutlined } from "@mui/icons-material";
// Types
import { CardEventProps } from "./types";
// Styles
import theme from "@/theme";
import { InformationLabel } from "../InformationLabel";
import CategoryLabel from "../CategoryLabel";

export const CardEvent = ({
  image,
  name,
  date,
  description,
  location,
  redirect,
  chip,
}: CardEventProps) => {
  const elisisDescription =
    description?.length > 70 ? `${description.slice(0, 100)}...` : description;

  const EventDate = () => (
    <InformationLabel
      icon={{
        component: CalendarMonthOutlined,
      }}
      label={date}
      color={theme.palette.grey[200]}
    />
  );

  const Location = () => (
    <InformationLabel
      icon={{ component: LocationOnOutlined }}
      label={location}
      color={theme.palette.grey[200]}
    />
  );

  return (
    <Box
      borderRadius={2}
      display="flex"
      flexDirection="column"
      {...(image && { paddingY: 3, paddingX: 2 })}
    >
      <Grid container spacing={2}>
        {image && (
          <Grid item md={4} sm={12}>
            <Box
              height={150}
              width="100%"
              position="relative"
              borderRadius={2}
              overflow="hidden"
            >
              <Image src={image.src} fill alt={image.alt} />
            </Box>
          </Grid>
        )}
        <Grid item md={image ? 8 : 12} sm={12}>
          <Box display="flex" flexDirection="column" gap={1}>
            {chip && (
              <Box display="flex" justifyContent="space-between">
                <EventDate />
                <CategoryLabel
                  label={chip.label}
                  textColor={chip.color}
                  backgroundColor={chip.backgroundColor}
                />
              </Box>
            )}

            <Box>
              <Typography variant="h4">{name}</Typography>
            </Box>

            {!chip && (
              <Box display="flex" gap={1}>
                <EventDate />
                <Location />
              </Box>
            )}

            {description && (
              <Box>
                <Typography
                  variant="body1"
                  color={theme.palette.text.secondary}
                  sx={{
                    elipsis: "ellipsis",
                  }}
                >
                  {elisisDescription}
                </Typography>
              </Box>
            )}

            {chip && <Location />}
            {redirect && (
              <Box marginTop={1}>
                <Button component="a" href={redirect.to} variant="contained">
                  {redirect.label}
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
