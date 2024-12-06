import dayjs from "dayjs";

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const formattedDate = start.format("dddd D MMMM YYYY");
  const formattedTimeRange = `${start.format("hh:mm")} - ${end.format(
    "hh:mm A"
  )}`;

  return `${formattedDate} , ${formattedTimeRange}`;
};

export const formatDate = (date: string, language: string): string => {
  return dayjs(date).locale(language).format("YYYY-MMMM-DD");
};
export const formatDateAndTime = (date: string, language: string): string => {
  return dayjs(date).locale(language).format("YYYY-MMMM-DD HH:mm:ss A");
};
