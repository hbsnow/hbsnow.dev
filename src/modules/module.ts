import { createContext } from 'react'
import path from 'path'
import matter from 'gray-matter'
import { Entry, EntryCollection, createClient } from 'contentful'
import { IBookFields } from '../models/contentful'

export const initialState: StateType = {}

export const StateContext = createContext(null)
export const DispatchContext = createContext(null)

export const reducer = (state: StateType, action): StateType => {
  switch (action.type) {
    case 'loadBlog': {
      const blog = ((context): BlogType[] => {
        const keys = context.keys()
        const values = keys.map(context) as { [key: string]: string }[]

        return keys.map((key, i) => {
          const slug = path.basename(key, '.md')
          const document = matter(values[i].default)

          return { slug, document }
        })
      })(require.context('../posts', true, /\.md$/))

      return {
        ...state,
        blog,
      }
    }
    case 'book': {
      return {
        ...state,
        book: action.book,
      }
    }
    default:
      throw new Error()
  }
}

export const loadBlog = (): BlogType[] => {
  const blog = ((context): BlogType[] => {
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

export const fetchBook = async (): Promise<BookType> => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_API_ACCESS_TOKEN,
  })

  // eslint-disable-next-line @typescript-eslint/camelcase
  const query = { content_type: 'book' }

  return {
    entries: await client.getEntries(query),
  }
}

type StateType = {
  blog?: BlogType[]
  book?: Entry<IBookFields>[]
}

export type BlogType = {
  slug: string
  document: matter.GrayMatterFile<string>
}

export type BookType = {
  entries: EntryCollection<IBookFields>
}
