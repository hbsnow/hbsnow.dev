import path from 'path'
import matter from 'gray-matter'
import { EntryCollection, createClient } from 'contentful'
import { IBookFields } from '../models/contentful'

export const loadBlogList = (): StateType['blogList'] => {
  const blogList = ((context): StateType['blogList'] => {
    const keys = context.keys()
    const values = keys.map(context) as { [key: string]: string }[]

    return keys.map((key, i) => {
      const slug = path.basename(key, '.md')
      const document = matter(values[i].default)

      return { slug, ...document.data }
    })
  })(require.context(`../posts`, true, /\.md$/))

  return JSON.parse(JSON.stringify(blogList))
}

export const loadBlog = async (
  slug: string
): Promise<matter.GrayMatterFile<string>> => {
  const content = await import(`../posts/${slug}.md`)

  return JSON.parse(JSON.stringify(matter(content.default)))
}

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
}

export type BlogType = {
  slug: string
} & matter.GrayMatterFile<string>['data']
