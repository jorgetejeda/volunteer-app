import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
// Icons
import { LocationOnOutlined, CalendarMonthOutlined } from "@mui/icons-material";
// Components
import { ButtonLink } from "../ButtonLink";
// Types
import { CardEventProps } from "./types";
// Styles
import theme from "@/theme";
import { InformationLabel } from "../InformationLabel";

export const CardEvent = ({
  image,
  name,
  date,
  description,
  location,
  redirect,
}: CardEventProps) => {
  return (
    <Box padding={2} borderRadius={2} display="flex" flexDirection="column">
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
              <Image src={image} fill alt="test image" />
            </Box>
          </Grid>
        )}
        <Grid item md={image ? 8 : 12} sm={12}>
          <Box display="flex" flexDirection="column" gap={1}>
            <InformationLabel
              icon={{
                component: CalendarMonthOutlined,
              }}
              label={date}
            />

            <Box>
              <Typography variant="h4" color={theme.palette.text.accent}>
                {name}
              </Typography>
            </Box>

            {description && (
              <Box>
                <Typography
                  variant="body1"
                  color={theme.palette.text.secondary}
                >
                  {description}
                </Typography>
              </Box>
            )}
            <InformationLabel
              icon={{ component: LocationOnOutlined }}
              label={location}
            />

            {redirect && (
              <Box>
                <ButtonLink
                  variant={redirect.variant}
                  label={redirect.label}
                  to={redirect.to}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
