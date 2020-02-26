import { createContext } from 'react'
import path from 'path'
import matter from 'gray-matter'
import { EntryCollection, createClient } from 'contentful'
import { IBookFields } from '../models/contentful'

export const initialState: StateType = {
  blog: undefined,
  book: undefined,
  isBookLoading: false,
}

export const StateContext = createContext(null)
export const DispatchContext = createContext(null)

export const reducer = (state: StateType, action): StateType => {
  switch (action.type) {
    case 'blog': {
      return {
        ...state,
        blog: action.blog,
      }
    }
    case 'book': {
      return {
        ...state,
        book: action.book,
      }
    }
    case 'isBookLoading': {
      return {
        ...state,
        isBookLoading: action.isBookLoading,
      }
    }
    default:
      throw new Error()
  }
}

export const loadBlog = (): StateType['blog'] => {
  const blog = ((context): StateType['blog'] => {
    const keys = context.keys()
    const values = keys.map(context) as { [key: string]: string }[]

    return keys.map((key, i) => {
      const slug = path.basename(key, '.md')
      const document = matter(values[i].default)

      return { slug, document }
    })
  })(require.context('../posts', true, /\.md$/))

  return blog
}

export const fetchBook = async (): Promise<StateType['book']> => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_API_ACCESS_TOKEN,
  })

  // eslint-disable-next-line @typescript-eslint/camelcase
  const query = { content_type: 'book' }

  return client.getEntries(query)
}

export type StateType = {
  blog?: BlogType[]
  book?: EntryCollection<IBookFields>
  isBookLoading: boolean
}

export type BlogType = {
  slug: string
  document: matter.GrayMatterFile<string>
}
