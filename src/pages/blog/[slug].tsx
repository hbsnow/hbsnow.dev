import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { loadBlogList, loadBlog, BlogType } from '../../modules/blog'
import Container from '../../elements/container/Container'
import Markdown from '../../elements/markdown/Markdown'
import BlogHeader from '../../components/blog/BlogHeader'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ blog }) => {
  return (
    <>
      <Head>
        <title>{blog.data.title} - hbsnow.dev</title>
        <meta name="description" content={blog.data.description} />
      </Head>
      <DefaultTemplate>
        <Container>
          <article>
            <BlogHeader post={blog.data} />
            <Markdown source={blog.content} />
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
  const blog = await loadBlog(params.slug)

  return { props: { blog } }
}

type PageProps = {
  blog: BlogType
}

export default Page
