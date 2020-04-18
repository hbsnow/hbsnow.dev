import 'dayjs/locale/ja'

import { useMemo } from 'react'

import dayjs from 'dayjs'

dayjs.locale('ja')

export const useFormattedDate = (
  date?: dayjs.ConfigType,
  format = 'YYYY-MM-DD'
): string => {
  return useMemo(() => {
    return date ? dayjs(date).format(format) : ''
  }, [date, format])
}
