import path from 'path'
import matter from 'gray-matter'

export const loadBlogList = (): BlogType[] => {
  const blogList = ((context): BlogType[] => {
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

export const loadBlog = async (slug: string): Promise<BlogType> => {
  const content = await import(`../posts/${slug}.md`)

  return JSON.parse(
    JSON.stringify({
      ...matter(content.default),
      slug,
    })
  )
}

export type BlogType = {
  slug: string
} & matter.GrayMatterFile<string>['data']
