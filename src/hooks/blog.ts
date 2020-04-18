import { useMemo } from 'react'

import { BlogType } from '../modules/blog'

export const useSortBlog = (blogList: BlogType[]): BlogType[] =>
  useMemo(
    () =>
      blogList.sort((prev, current) =>
        prev.createdAt < current.createdAt ? 1 : -1
      ),
    [blogList]
  )

export const useFilterBlogBy = (
  blogList: BlogType[],
  tagSlug: string
): BlogType[] =>
  useMemo(
    () =>
      blogList.filter((blog) =>
        blog.tags.some((tag: string) => tag === tagSlug)
      ),
    [blogList, tagSlug]
  )
