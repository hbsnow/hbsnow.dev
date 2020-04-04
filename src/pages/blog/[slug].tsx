import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { loadBlogList, loadBlog, BlogType } from '../../modules/blog'
import Container from '../../elements/container/Container'
import Markdown from '../../elements/markdown/Markdown'
import BlogHeader from '../../components/blog/BlogHeader'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ document }) => {
  return (
    <>
      <Head>
        <title>{document.data.title} - hbsnow.dev</title>
        <meta name="description" content={document.data.description} />
      </Head>
      <DefaultTemplate>
        <Container>
          <article>
            <BlogHeader post={document.data} />
            <Markdown source={document.content} />
          </article>
        </Container>
      </DefaultTemplate>
    </>
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
  document: BlogType
}

export default Page
