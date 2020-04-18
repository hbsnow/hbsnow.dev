import 'dayjs/locale/ja'

import { useMemo } from 'react'

import dayjs from 'dayjs'

dayjs.locale('ja')

export const useFullPath = (path: string): string =>
  useMemo(() => new URL(path, 'https://hbsnow.dev').toString(), [path])
