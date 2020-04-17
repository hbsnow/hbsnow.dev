import { useMemo } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export const useFullPath = (path: string): string =>
  useMemo(() => new URL(path, 'https://hbsnow.dev').toString(), [path])
