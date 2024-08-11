import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const formatDate = (date: string) =>
  dayjs(date).format("D [de] MMMM [del] YYYY");

const formatTime = (time: string) => dayjs(time).format("HH:mm");

const combineDateAndTime = ({ date, time }: { date: string; time: string }) => {
  const d = formatDate(date);
  const t = formatTime(time);

  return `${d} a las ${t}`;
};

export { formatDate, formatTime, combineDateAndTime };
