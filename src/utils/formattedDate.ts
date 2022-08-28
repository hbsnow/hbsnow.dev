import dayjs, { ConfigType } from "dayjs";

type FormattedDate = {
  (date: Exclude<ConfigType, undefined | null>): string;
  (date: undefined | null): undefined;
  (date: ConfigType): string | undefined;
};

export const formattedDate: FormattedDate = (date) => {
  if (date == null) {
    return undefined;
  }

  const d = dayjs(date);

  if (!d.isValid()) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return d.format("YYYY-MM-DD") as any;
};
