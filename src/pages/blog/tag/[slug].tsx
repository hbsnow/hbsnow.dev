import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import DefaultTemplate from '../../../templates/DefaultTemplate/DefaultTemplate'
import { loadBlogList, BlogType } from '../../../modules/blog'
import Container from '../../../elements/container/Container'
import BlogList from '../../../components/blog/BlogList'
import { useFilterBlogBy } from '../../../hooks/blog'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ slug, blogList }) => {
  const filteredBlogList = useFilterBlogBy(blogList, slug)
  return (
    <>
      <Head>
        <title>{slug} - hbsnow.dev</title>
        <meta name="description" content={`${slug}`} />
      </Head>
      <DefaultTemplate>
        <Container>
          <BlogList blogList={filteredBlogList} />
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
  const tagList = blogList
    .flatMap((blog) => blog.tags)
    .filter((blog, i, self) => self.indexOf(blog) === i)

  return {
    fallback: false,
    paths: tagList.map((tag) => `/blog/tag/${tag}`),
  }
}

export const getStaticProps = ({ params }): { props: PageProps } => {
  const slug = params.slug
  const blogList = loadBlogList()

  return {
    props: {
      slug,
      blogList: JSON.parse(JSON.stringify(blogList)),
    },
  }
}

type PageProps = {
  slug: string
  blogList: BlogType[]
}

export default Page
