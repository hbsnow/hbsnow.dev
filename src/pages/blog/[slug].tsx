import React from 'react'

import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'

import BlogHeader from '../../components/blog/BlogHeader'
import Container from '../../elements/container/Container'
import Margin from '../../elements/margin/Margin'
import Markdown from '../../elements/markdown/Markdown'
import { BlogType, loadBlog, loadBlogList } from '../../modules/blog'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { toSlugString } from '../../utils/url'

export const config = { amp: true }

type Props = {
  blog: BlogType
}

const Page: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <Head>
        <title>{blog.data.title} - hbsnow.dev</title>
        <meta name="description" content={blog.data.description} />
      </Head>
      <DefaultTemplate>
        <Container>
          <Margin bottom={6}>
            <article>
              <BlogHeader post={blog.data} />
              <Markdown source={blog.content} />
            </article>
          </Margin>
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

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{ props: Props }> => {
  const blog = await loadBlog(toSlugString(params?.slug ?? []))

  return { props: { blog } }
}

export default Page
