import React from 'react'
import { NextPage } from 'next'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import PageTemplate from '../../templates/PageTemplate/PageTemplate'

const Page: NextPage<PageProps> = ({ document }) => {
  return (
    <PageTemplate>
      <h2>{document.data.title}</h2>
      <ReactMarkdown source={document.content} />
    </PageTemplate>
  )
}

Page.getInitialProps = async (context): Promise<PageProps> => {
  const { slug } = context.query

  if (Array.isArray(slug)) {
    throw new Error('slugが複数指定されています。')
  }

  const content = await import(`../../posts/${slug}.md`)
  const data = matter(content.default)

  return {
    slug,
    document: data,
  }
}

type PageProps = {
  slug: string
  document: matter.GrayMatterFile<string>
}

export default Page
