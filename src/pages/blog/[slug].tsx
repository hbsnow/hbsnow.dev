import React from 'react'
import { NextPage } from 'next'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { loadBlogList, loadBlog } from '../../modules/blog'
import Container from '../../elements/container/Container'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ document }) => {
  return (
    <DefaultTemplate>
      <Container>
        <h1>{document.data.title}</h1>
        <ReactMarkdown source={document.content} />
      </Container>
    </DefaultTemplate>
  )
}

export const getStaticPaths = (): {
  fallback: boolean
  paths: string[]
} => {
  const blogList = loadBlogList()

  return {
    fallback: false,
    paths: blogList.map((blog) => `/blog/${blog.slug}`),
  }
}

export const getStaticProps = async ({
  params,
}): Promise<{ props: PageProps }> => {
  const document = await loadBlog(params.slug)

  return { props: { document } }
}

type PageProps = {
  document: matter.GrayMatterFile<string>
}

export default Page
