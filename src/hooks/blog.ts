import { useMemo } from 'react'
import { StateType } from '../modules'

export const useSortBlog = (
  posts: StateType['blogList']
): StateType['blogList'] =>
  useMemo(
    () =>
      posts.sort((prev, current) =>
        prev.createdAt < current.createdAt ? 1 : -1
      ),
    [posts]
  )
