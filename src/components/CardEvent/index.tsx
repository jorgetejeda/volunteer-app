import React from "react";
import { Box, Grid, Typography } from "@mui/material";
// Icons
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Img } from "./Image";
import theme from "@/theme";
import { ButtonLink } from "../ButtonLink";

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
            {/* <Img */}
            {/*   src={`https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60`} */}
            {/*   width={200} */}
            {/*   height={200} */}
            {/*   alt="test image" */}
            {/* /> */}
          </Grid>
        )}
        <Grid item md={image ? 8 : 12} sm={12}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="end" gap={1}>
              <CalendarMonthOutlinedIcon fontSize="small" />
              <Typography variant="caption">{date}</Typography>
            </Box>

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

            <Box display="flex" alignItems="end" gap={1}>
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="caption">{location}</Typography>
            </Box>

            {redirect && <ButtonLink label={redirect.label} to={redirect.to} />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
