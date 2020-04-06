import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { BlogType, loadBlogList } from '../../modules/blog'
import Container from '../../elements/container/Container'
import BlogList from '../../components/blog/BlogList'
import { useSortBlog } from '../../hooks/blog'

export const config = { amp: true }

type Props = {
  blogList: BlogType[]
}

const Page: NextPage<Props> = ({ blogList }) => {
  const sortedBlogList = useSortBlog(blogList)

  return (
    <>
      <Head>
        <title>hbsnow.dev</title>
        <meta name="description" content="hbsnowのメモ書き置き場兼実験場。" />
      </Head>
      <DefaultTemplate>
        <Container>
          <BlogList blogList={sortedBlogList} />
        </Container>
      </DefaultTemplate>
    </>
  )
}

export const getStaticProps = async (): Promise<{
  props: Props
}> => {
  const blogList = loadBlogList()

  return {
    props: {
      blogList: JSON.parse(JSON.stringify(blogList)),
    },
  }
}

export default Page
