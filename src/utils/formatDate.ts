import dayjs, { ConfigType } from "dayjs";

export const formatDate = (
  date: NonNullable<ConfigType>,
  format = "YYYY-MM-DD"
) => {
  return dayjs(date).format(format);
};
