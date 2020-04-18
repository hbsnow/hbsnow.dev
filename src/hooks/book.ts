import { useMemo } from 'react'

import { Entry } from 'contentful'

import { IBookFields } from '../models/contentful'

export const useMinBookCreatedAt = (bookList: Entry<IBookFields>[]): string =>
  useMemo(() => {
    return bookList.reduce((prev, current) => {
      if (prev === '') return current.sys.createdAt
      return prev < current.sys.createdAt ? prev : current.sys.createdAt
    }, '')
  }, [bookList])

export const useMaxBookUpdatedAt = (bookList: Entry<IBookFields>[]): string =>
  useMemo(() => {
    console.log(bookList)
    return bookList.reduce((prev, current) => {
      if (prev === '') return current.sys.updatedAt
      return prev > current.sys.updatedAt ? prev : current.sys.updatedAt
    }, '')
  }, [bookList])
