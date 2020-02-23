import React from 'react'
import { NextPage } from 'next'
import PageTemplate from '../templates/PageTemplate/PageTemplate'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

const Page: NextPage<PageProps> = ({ posts }) => (
  <PageTemplate>
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
            <a>{post.document.data.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </PageTemplate>
)

Page.getInitialProps = async (): Promise<PageProps> => {
  const posts = ((context): Post[] => {
    const keys = context.keys()
    const values = keys.map(context) as { [key: string]: string }[]

    return keys.map((key, i) => {
      const slug = path.basename(key, '.md')
      const document = matter(values[i].default)

      return { slug, document }
    })
  })(require.context('../posts', true, /\.md$/))

  return { posts }
}

type Post = {
  slug: string
  document: matter.GrayMatterFile<string>
}

type PageProps = {
  posts: Post[]
}

export default Page
