import { useMemo } from 'react'

export const useSortedTagList = (
  tagList: string[],
  preferredTag?: string
): string[] =>
  useMemo(() => {
    return [...tagList].sort((a, b) => {
      if (a === preferredTag) return -1
      if (b === preferredTag) return 1

      return a < b ? -1 : 1
    })
  }, [preferredTag, tagList])
