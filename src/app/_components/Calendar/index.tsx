'use client'
import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIME_ZONE = "America/Santo_Domingo";

export const Calendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DateCalendar
        value={dayjs().tz(TIME_ZONE)}
        sx={{
          width: "auto",
          maxWidth: "100%",
          fontSize: "0.75rem",
          "& .MuiPickersCalendarHeader-root": {
            paddingLeft: "0",
            paddingRight: "0",
          },
          "& .MuiPickersDay-today": {
            color: "white",
            background: "blue",
            border: "none",
            outline: "none",
          },
          "& .MuiPickersDay-dayWithMargin": {
            width: "30px",
            height: "30px",
          },
          "& .MuiDayCalendar-weekDayLabel": {
            width: "30px",
          },
        }}
      />
    </LocalizationProvider>
  );
}
