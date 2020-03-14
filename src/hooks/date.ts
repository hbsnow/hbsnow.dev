import { useMemo } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export const useFormatDate = (date?: dayjs.ConfigType): string =>
  useMemo(() => date && dayjs(date).format('YYYY-MM-DD'), [date])
