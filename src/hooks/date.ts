import 'dayjs/locale/ja'

import { useMemo } from 'react'

import dayjs from 'dayjs'

dayjs.locale('ja')

export const useFormattedDate = ({
  date,
  format = 'YYYY-MM-DD',
}: {
  date?: dayjs.ConfigType
  format?: string
}): string =>
  useMemo(() => dayjs(date ?? new Date()).format(format), [date, format])
