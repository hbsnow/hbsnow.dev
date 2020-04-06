import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import DefaultTemplate from '../../../templates/DefaultTemplate/DefaultTemplate'
import { loadBlogList, BlogType } from '../../../modules/blog'
import Container from '../../../elements/container/Container'
import BlogList from '../../../components/blog/BlogList'
import { useFilterBlogBy } from '../../../hooks/blog'

export const config = { amp: true }

type Props = {
  slug: string
  blogList: BlogType[]
}

const Page: NextPage<Props> = ({ slug, blogList }) => {
  const filteredBlogList = useFilterBlogBy(blogList, slug)
  return (
    <>
      <Head>
        <title>{slug} - hbsnow.dev</title>
        <meta
          name="description"
          content={`${slug} のタグが含まれるブログ記事。`}
        />
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
  const paths = blogList
    .flatMap((blog) => blog.tags)
    .filter((blog, i, self) => self.indexOf(blog) === i)
    .map((tag) => `/blog/tag/${tag}`)

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps = ({ params }): { props: Props } => {
  const slug = params.slug
  const blogList = loadBlogList()

  return {
    props: {
      slug,
      blogList: JSON.parse(JSON.stringify(blogList)),
    },
  }
}

export default Page
