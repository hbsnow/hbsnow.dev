import { createContext } from 'react'
import path from 'path'
import matter from 'gray-matter'
import { EntryCollection, createClient } from 'contentful'
import { IBookFields } from '../models/contentful'

export const initialState: StateType = {
  blogList: undefined,
  bookList: undefined,
  isBookListLoading: false,
}

export const StateContext = createContext(null)
export const DispatchContext = createContext(null)

export const reducer = (state: StateType, action): StateType => {
  switch (action.type) {
    case 'blogList': {
      return {
        ...state,
        blogList: action.blogList,
      }
    }
    case 'bookList': {
      return {
        ...state,
        bookList: action.bookList,
      }
    }
    case 'isBookListLoading': {
      return {
        ...state,
        isBookListLoading: action.isBookListLoading,
      }
    }
    default:
      throw new Error()
  }
}

export const loadBlogList = (): StateType['blogList'] => {
  const blogList = ((context): StateType['blogList'] => {
    const keys = context.keys()
    const values = keys.map(context) as { [key: string]: string }[]

    return keys.map((key, i) => {
      const slug = path.basename(key, '.md')
      const document = matter(values[i].default)

      return { slug, document }
    })
  })(require.context('../posts', true, /\.md$/))

  return blogList
}

// export const loadBlog = (slug: string): StateType['blogList'] => {
//   const blog = ((context): StateType['blogList'] => {
//     const keys = context.keys()
//     const values = keys.map(context) as { [key: string]: string }[]

//     return keys.map((key, i) => {
//       const slug = path.basename(key, '.md')
//       const document = matter(values[i].default)

//       return { slug, document }
//     })
//   })(require.context('../posts', true, /\.md$/))

//   return blog
// }

export const fetchBookList = async (): Promise<StateType['bookList']> => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_API_ACCESS_TOKEN,
  })

  // eslint-disable-next-line @typescript-eslint/camelcase
  const query = { content_type: 'book' }

  return client.getEntries(query)
}

export type StateType = {
  blogList?: BlogType[]
  bookList?: EntryCollection<IBookFields>
  isBookListLoading: boolean
}

export type BlogType = {
  slug: string
  document: matter.GrayMatterFile<string>
}
