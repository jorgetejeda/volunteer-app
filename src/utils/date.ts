import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const formatDate = (date: string) =>
  dayjs(date).format("D [de] MMMM [del] YYYY");

const formatTimeTo12Hour = (time: string | undefined) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(+hours, +minutes);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
const combineDateAndTime = ({ date, time }: { date: string; time: string }) => {
  const d = formatDate(date);
  // const t = formatTimeTo12Hour(time);

  return `${d}`;
};

export { formatDate, combineDateAndTime };
